<template>
  <div class="q-ma-md">
    <center>
      <h3>Purchase</h3>
    </center>

    <!-- Form -->
    <q-card class="row justify-around q-mb-md">
      <div class="col-md-5 col-xs-12 q-ma-md">
        <q-select
          autofocus
          v-model="form.supplierId"
          outlined
          dense
          label="Supplier"
          map-options
          emit-value
          :options="suppliers"
          option-value="_id"
          option-label="companyName"
        />
      </div>
      <div class="col-md-5 col-xs-12 q-ma-md">
        <q-select
          autofocus
          v-model="form.itemId"
          outlined
          dense
          label="Item"
          map-options
          emit-value
          :options="items"
          option-value="_id"
          option-label="name"
        />
      </div>
      <div class="col-md-5 col-xs-12 q-ma-md">
        <q-input
          v-model.number="form.cost"
          label="Cost"
          autogrow
          outlined
          dense
        />
      </div>
      <div class="col-md-5 col-xs-12 q-ma-md">
        <q-input
          v-model.number="form.price"
          label="Price"
          autogrow
          outlined
          dense
        />
      </div>
      <div class="col-md-5 col-xs-12 q-ma-md">
        <q-input
          v-model.number="form.quanity"
          label="Quanity"
          autogrow
          outlined
          dense
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
          <th class="text-left">Cost</th>
          <th class="text-left">Price</th>
          <th class="text-left">Quanity</th>
          <th class="text-left">Date</th>
          <th class="text-left">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in purchases" :key="index">
          <td class="text-left">{{ index + 1 }}</td>
          <td class="text-left">{{ item.item }}</td>
          <td class="text-left">{{ item.cost }}</td>
          <td class="text-left">{{ item.price }}</td>
          <td class="text-left">{{ item.quanity }}</td>
          <td class="text-left">{{ formatDate(item.date) }}</td>
          <td class="text-left">{{ item.status }}</td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      form: {
        supplierId: "",
        itemId: "",
        cost: "",
        price: "",
        quanity: "",
        date: "",
        status: "",
      },
      items: [],
      suppliers: [],
      purchases: [],
      index: -1,
    };
  },
  mounted() {
    this.getData();
    this.getSupplier();
    this.getItem();
  },
  methods: {
    formatDate(date) {
      return moment(date).format("DD-MM-YYYY");
    },
    getData() {
      Meteor.call("findStock", this.form, (error, result) => {
        if (result) {
          this.purchases = result;
        } else {
          console.log("error", error);
        }
      });
    },
    getSupplier() {
      Meteor.call("findSupplier", this.form, (error, result) => {
        if (result) {
          this.suppliers = result;
        } else {
          console.log("error", error);
        }
      });
    },
    getItem() {
      Meteor.call("findItem", this.form, (error, result) => {
        if (result) {
          this.items = result;
        } else {
          console.log("error", error);
        }
      });
    },
    clearForm() {
      this.form = {
        supplierId: "",
        itemId: "",
        cost: "",
        price: "",
        quanity: "",
        date: "",
        status: "",
      };
    },
    alertBox(msg) {
      this.$q.notify({
        message: msg,
        color: "positive",
        position: "top",
      });
    },
    handleSubmit() {
      if (!this.form._id) {
        this.form.date = moment(this.form.date, "YYYY/MM/DD").toDate();
        Meteor.call("addStock", this.form, (error, result) => {
          if (result) {
            this.getData();
          } else {
            console.log("error", error);
          }
        });
      } else {
        Meteor.call("updatePurchase", this.form, (error, result) => {
          if (result) {
            this.getData();
          }
        });
      }
      this.clearForm();
      this.getData();
    },
  },
};
</script>

<style></style>
