<template>
  <div class="q-ma-md">
    <!-- Form -->
    <q-card class="row justify-around q-mb-md">
      <div class="col-md-5 col-xs-12 q-ma-md">
        <q-input v-model="form.name" label="Name" outlined dense />
      </div>
      <div class="col-md-5 col-xs-12 q-ma-md">
        <q-select
          outlined
          dense
          v-model="form.categoryId"
          :options="categorys"
          map-options
          emit-value
          label="Category"
          option-label="name"
          option-value="_id"
        />
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
          v-model="form.description"
          label="Description"
          autogrow
          outlined
          dense
        />
      </div>
      <div class="text-center col-md-5 col-xs-12 q-ma-md">
        <label class="text-grey-8">Status</label>
        <q-radio
          v-model="form.status"
          val="active"
          label="Active"
          color="green"
        />
        <q-radio
          v-model="form.status"
          val="inactive"
          label="Inactive"
          color="red"
        />
      </div>
      <div class="col-md-12 q-ma-md text-center">
        <q-btn
          :color="index == -1 ? `primary` : `info`"
          @click="handleSubmit"
          >{{ index == -1 ? `Submit` : `Update` }}</q-btn
        >
      </div>
    </q-card>
    <!-- table -->

    <q-markup-table>
      <thead>
        <tr>
          <th class="text-left">No</th>
          <th class="text-left">Name</th>
          <th class="text-left">Category</th>
          <th class="text-left">Date</th>
          <th class="text-left">Description</th>
          <th class="text-left">Status</th>
          <td class="text-center">Action</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items" :key="index">
          <td class="text-left">{{ index + 1 }}</td>
          <td class="text-left">{{ item.name }}</td>
          <td class="text-left">{{ item.category }}</td>
          <td class="text-left">{{ item.date }}</td>
          <td class="text-left">{{ item.description }}</td>
          <td class="text-left">{{ item.status }}</td>
          <td class="text-center">
            <q-btn
              icon="delete"
              color="red"
              dense
              @click="handleDelete(item._id)"
            />
            <q-btn icon="edit" color="info" dense @click="handleEdit(item)" />
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
        name: "",
        categoryId: "",
        description: "",
        date: "",
        status: "",
      },
      categorys: [],
      items: [],
      index: -1,
    };
  },
  mounted() {
    this.getCategory();
    this.getData();
  },
  methods: {
    getData() {
      Meteor.call("findItem", this.form, (error, result) => {
        if (result) {
          this.items = result;
        } else {
          console.log("error", error);
        }
      });
    },
    getCategory() {
      Meteor.call("findCatecory", this.form, (error, result) => {
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
        categoryId: null,
        description: null,
        date: null,
        status: null,
      };
    },
    handleSubmit() {
      if (!this.form._id) {
        Meteor.call("insertItem", this.form, (error, result) => {
          if (result) {
            console.log("Success", result);
          } else {
            console.log("error", error);
          }
        });
      } else {
        Meteor.call("updateItem", this.form, (error, result) => {
          if (result) {
            this.getData();
          }
        });
      }
      this.clearForm();
      this.getData();
    },
    handleDelete(id) {
      Meteor.call("removeItem", id, (error, result) => {
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
