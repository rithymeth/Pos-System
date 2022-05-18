<template>
  <div>
    <center>
      <h3>Sale Form</h3>
    </center>
    <div class="text-h5 text-center"></div>
    <!-- Form -->
    <div class="row items-center">
      <div class="col-md-8 col-xs-12">
        <!-- invoiceNumber -->
        <div class="q-ma-sm">
          <q-input
            v-model="form.invoiceNumber"
            outlined
            label="Invoice Number"
            readonly
          />
        </div>
        <!-- Date -->
        <div class="q-ma-sm">
          <q-input v-model="form.date" outlined label="Date" readonly />
        </div>
        <!-- Customer -->
        <div class="q-ma-sm">
          <q-select
            v-model="form.customerId"
            outlined
            label="Customer"
            emit-value
            map-options
            :options="customers"
            option-value="_id"
            option-label="name"
            @filter="filterFn"
            use-input
          />
        </div>
        <!-- Item -->
        <div class="q-ma-sm">
          <q-select
            v-model="itemId"
            outlined
            label="Item"
            emit-value
            map-options
            :options="items"
            option-label="item"
            @input="handleUpdateItem"
            @filter="filterFnItem"
            use-input
          />
        </div>
      </div>
      <div class="col-md-4 col-xs-12">
        <div class="text-h4 text-center">Total: {{ getTotal() }}$</div>
      </div>
    </div>
    <!-- table -->
    <q-markup-table class="q-mt-md q-mb-md q-ma-sm">
      <thead>
        <tr>
          <th class="text-left">No</th>
          <th class="text-left">Name</th>
          <th class="text-left">Price</th>
          <th class="text-left">Qty</th>
          <th class="text-left">Amount</th>
          <th class="text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in form.items" :key="index">
          <td class="text-left">{{ index + 1 }}</td>
          <td class="text-left">{{ item.item }}</td>
          <td class="text-left">{{ item.price }}$</td>
          <td class="text-left">
            <q-input v-model="item.qty" outlined dense style="width: 50px" />
          </td>
          <td class="text-left">{{ item.price * item.qty }}$</td>
          <td class="text-center">
            <q-btn
              icon="delete"
              flat
              dense
              color="red"
              @click="handleRemoveItem(index)"
            />
          </td>
        </tr>
      </tbody>
    </q-markup-table>
    <center>
      <q-btn label="Submit" color="primary" @click="handleSubmit" />
    </center>
  </div>
</template>
<script>
import moment from "moment";
export default {
  data() {
    return {
      itemId: null,
      form: {
        invoiceNumber: 1,
        date: moment(new Date()).format("DD/MM/YYYY"),
        customerId: null,
        items: [],
      },
      sales: [],
      purchases: [],
      customers: [],
      itemsOpts: [],
      items: [],
    };
  },
  mounted() {
    this.getCustomer();
    this.getStock();
    this.getInvoice();
  },
  methods: {
    getInvoice() {
      Meteor.call("invoiceNumber", (err, result) => {
        if (result) {
          this.form.invoiceNumber = result;
        } else {
          console.log("err", err);
        }
      });
    },
    getStock() {
      Meteor.call("findStock", (err, result) => {
        if (result) {
          this.itemsOpts = result;
        } else {
          console.log("err", err);
        }
      });
    },
    getCustomer() {
      Meteor.call("findCustomer", (err, result) => {
        if (result) {
          this.customerOpts = result;
        } else {
          console.log("err", err);
        }
      });
    },
    handleUpdateItem(item) {
      console.log("item", item);
      let index = this.form.items.findIndex((obj) => {
        return obj._id === item._id;
      });
      if (index >= 0) {
        this.form.items[index].qty++;
      } else {
        this.form.items.push({
          _id: item._id,
          item: item.item,
          price: item.price,
          qty: 1,
        });
      }
    },
    handleRemoveItem(index) {
      this.form.items.splice(index, 1);
    },
    filterFn(val, update) {
      if (val === "") {
        update(() => {
          this.customers = this.customerOpts;
        });
        return;
      }
      update(() => {
        const needle = val.toLowerCase();
        this.customers = this.customerOpts.filter(
          (v) => v.name.toLowerCase().indexOf(needle) > -1
        );
      });
    },
    filterFnItem(val, update) {
      if (val === "") {
        update(() => {
          this.items = this.itemsOpts;
        });
        return;
      }
      update(() => {
        const needle = val.toLowerCase();
        this.items = this.itemsOpts.filter(
          (v) => v.name.toLowerCase().indexOf(needle) > -1
        );
      });
    },
    getTotal() {
      let total = 0;
      this.form.items.forEach((obj) => {
        let amount = obj.price * obj.qty;
        total += amount;
      });
      return total;
    },
    handleSubmit() {
      let doc = this.form;
      doc.date = moment(this.form.date, "MM/DD/YYYY").toDate();
      Meteor.call("onSale", doc, (err, result) => {
        if (result) {
          doc.date = moment(doc.date).format("DD-MM-YY");
          let index = this.customerOpts.findIndex((it) => {
            return it._id === doc.customerId;
          });
          doc.customers = this.customerOpts[index]?.name;
          this.$router.push({
            name: "print",
            params: { documents: doc },
          });
        } else {
          console.log("err", err);
        }
      });
    },
  },
};
</script>

<style></style>