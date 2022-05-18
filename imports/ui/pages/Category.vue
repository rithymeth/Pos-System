<template>
  <div class="q-ma-md">
    <!-- Form -->
    <q-card class="row justify-around q-mb-md">
      <div class="col-md-5 col-xs-12 q-ma-md">
        <q-input v-model="form.name" label="Name" outlined dense />
      </div>
      <div class="col-md-5 col-xs-12 q-ma-md">
        <q-input v-model="form.date" outlined dense mask="date" label="Date">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                ref="qDateProxy"
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date v-model="form.date">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
      <div class="col-md-5 col-xs-12 q-ma-md">
        <q-input
          v-model="form.text"
          outlined
          dense
          label="Description"
          type="textarea"
        />
      </div>
      <div class="col-md-12 q-ma-md text-center">
        <q-btn
          dense
          :label="form._id ? `Update` : `Submit`"
          :color="form._id ? `deep-orange` : `primary`"
          @click="handleSubmit"
        />
      </div>
    </q-card>
    <!-- table -->

    <q-markup-table>
      <thead>
        <tr>
          <th class="text-left">No</th>
          <th class="text-left">Name</th>
          <th class="text-left">Date</th>
          <th class="text-left">Description</th>
          <td class="text-center">Action</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(category, index) in categorys" :key="index">
          <td class="text-left">{{ index + 1 }}</td>
          <td class="text-left">{{ category.name }}</td>
          <td class="text-left">{{ category.date }}</td>
          <td class="text-left">{{ category.text }}</td>
          <td class="text-center">
            <q-btn
              icon="delete"
              color="red"
              dense
              @click="handleDelete(category._id)"
            />
            <q-btn
              icon="edit"
              color="info"
              dense
              @click="handleEdit(category)"
            />
          </td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: null,
        date: null,
        text: null,
      },
      categorys: [],
      index: -1,
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      Meteor.call("findCatecory", (error, result) => {
        if (result) {
          this.categorys = result;
        } else {
          console.log("error", error);
        }
      });
    },
    clearForm() {
      this.form = {
        name: null,
        date: null,
        text: null,
      };
    },
    handleSubmit() {
      if (!this.form._id) {
        Meteor.call("insertCategory", this.form, (error, result) => {
          if (result) {
            console.log("Success", result);
          } else {
            console.log("error", error);
          }
        });
      } else {
        Meteor.call("updateCategory", this.form, (error, result) => {
          if (result) {
            this.getData();
          }
        });
      }
      this.clearForm();
      this.getData();
    },
    handleDelete(id) {
      Meteor.call("removeCategory", id, (error, result) => {
        if (result) {
          this.getData();
        } else {
          console.log("error", error);
        }
      });
    },
    handleEdit(doc) {
      this.form = Object.assign({}, doc);
    },
  },
};
</script>

<style></style>
