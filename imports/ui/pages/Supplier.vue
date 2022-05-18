<template>
  <div class="q-ma-md">
    <!-- Form -->
    <q-card class="row justify-around q-mb-md">
      <div class="col-md-5 col-xs-12 q-ma-md">
        <q-input
          v-model="form.companyName"
          label="Company Name"
          outlined
          dense
        />
      </div>
      <div class="col-md-5 col-xs-12 q-ma-md">
        <q-input v-model="form.name" label="Owner" outlined dense />
      </div>
      <div class="col-md-5 col-xs-12 q-ma-md">
        <q-input v-model="form.phone" label="phone" outlined dense />
      </div>

      <div class="col-md-5 col-xs-12 q-ma-md">
        <q-input v-model="form.adress" label="Adress" outlined dense />
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
          <th class="text-left">Company Name</th>
          <th class="text-left">Owner Name</th>
          <th class="text-left">phone</th>
          <th class="text-left">Address</th>
          <th class="text-left">Status</th>
          <td class="text-center">Action</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(supplier, index) in suppliers" :key="index">
          <td class="text-left">{{ index + 1 }}</td>
          <td class="text-left">{{ supplier.companyName }}</td>
          <td class="text-left">{{ supplier.name }}</td>
          <td class="text-left">{{ supplier.phone }}</td>
          <td class="text-left">{{ supplier.adress }}</td>
          <td class="text-left">{{ supplier.status }}</td>
          <td class="text-center">
            <q-btn
              icon="delete"
              color="red"
              dense
              @click="handleDelete(supplier._id)"
            />
            <q-btn
              icon="edit"
              color="info"
              dense
              @click="handleEdit(supplier)"
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
        companyName: "",
        name: "",
        phone: "",
        adress: "",
        status: "",
      },
      suppliers: [],
      index: -1,
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      Meteor.call("findSupplier", (error, result) => {
        if (result) {
          this.suppliers = result;
        } else {
          console.log("error", error);
        }
      });
    },
    clearForm() {
      this.form = {
        companyName: "",
        name: "",
        phone: "",
        adress: "",
        status: "",
      };
    },
    handleSubmit() {
      if (!this.form._id) {
        Meteor.call("insertSupplier", this.form, (error, result) => {
          if (result) {
            console.log("Success", result);
          } else {
            console.log("error", error);
          }
        });
      } else {
        Meteor.call("updateSupplier", this.form, (error, result) => {
          if (result) {
            this.getData();
          }
        });
      }
      this.clearForm();
      this.getData();
    },
    handleDelete(id) {
      Meteor.call("removeSupplier", id, (error, result) => {
        if (result) {
          this.getData();
        } else {
          console.log("error", error);
        }
      });
    },
    handleEdit(doc, index) {
      this.form = Object.assign({}, doc);
    },
  },
};
</script>

<style></style>
