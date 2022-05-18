<template>
  <div class="q-ma-md">
    <!-- Form -->
    <q-card class="row justify-around q-mb-md">
      <div class="col-md-5 col-xs-12 q-ma-md">
        <q-input v-model="form.name" label="Name" outlined dense />
      </div>
      <div class="col-md-5 col-xs-12 q-ma-md">
        <label class="text-grey-8">Gender</label>
        <q-radio v-model="form.gender" val="male" label="Male" />
        <q-radio v-model="form.gender" val="female" label="Female" />
      </div>
      <div class="col-md-5 col-xs-12 q-ma-md">
        <q-input
          v-model="form.dob"
          outlined
          dense
          mask="date"
          label="Date of Birth"
        >
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                ref="qDateProxy"
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date v-model="form.dob">
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
        <q-input v-model="form.phone" label="Phone" outlined dense />
      </div>
      <div class="col-md-5 col-xs-12 q-ma-md">
        <q-input v-model="form.address" label="Address" outlined dense />
      </div>
      <div class="col-md-5 col-xs-12 q-ma-md">
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
          <th class="text-left">Gender</th>
          <th class="text-left">Dob</th>
          <th class="text-left">Phone</th>
          <th class="text-left">Address</th>
          <th class="text-left">Status</th>
          <td class="text-center">Action</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(customer, index) in customers" :key="index">
          <td class="text-left">{{ index + 1 }}</td>
          <td class="text-left">{{ customer.name }}</td>
          <td class="text-left">{{ customer.gender }}</td>
          <td class="text-left">{{ customer.dob }}</td>
          <td class="text-left">{{ customer.phone }}</td>
          <td class="text-left">{{ customer.address }}</td>
          <td class="text-left">{{ customer.status }}</td>
          <td class="text-center">
            <q-btn
              icon="delete"
              color="red"
              dense
              @click="handleDelete(customer._id)"
            />
            <q-btn
              icon="edit"
              color="info"
              dense
              @click="handleEdit(customer)"
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
        gender: null,
        phone: null,
        dob: null,
        address: null,
        status: null,
      },
      customers: [],
      index: -1,
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      Meteor.call("findCustomer", (error, result) => {
        if (result) {
          this.customers = result;
        } else {
          console.log("error", error);
        }
      });
    },
    clearForm() {
      this.form = {
        name: null,
        gender: null,
        phone: null,
        dob: null,
        address: null,
        status: null,
      };
    },
    handleSubmit() {
      if (!this.form._id) {
        // this.customers.push(Object.assign({}, this.form));
        Meteor.call("insertCustomer", this.form, (error, result) => {
          if (result) {
            console.log("success", result);
          } else {
            console.log("error", error);
          }
        });
      } else {
        Meteor.call("updateCustomer", this.form, (error, result) => {
          if (result) {
            this.getData();
          }
        });
      }
      this.clearForm();
      this.getData();
    },
    handleDelete(id) {
      Meteor.call("removeCustomer", id, (error, result) => {
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
