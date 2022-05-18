<template>
  <div class="q-ma-md">
    <h1>Import</h1>
    <date-picker @submit="OnSubmit" />

    <q-markup-table>
      <thead>
        <tr>
          <th class="text-left">No</th>
          <th class="text-left">Date</th>
          <th class="text-left">Company</th>
          <th class="text-left">Item</th>
          <th class="text-left">Remains</th>
          <th class="text-left">Cost</th>
          <th class="text-left">Price</th>
          <th class="text-left">Quanity</th>
          <th class="text-left">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in imports" :key="index">
          <td class="text-left">{{ index + 1 }}</td>
          <td class="text-left">{{ formatDate(item.date) }}</td>
          <td class="text-left">{{ item.company }}</td>
          <td class="text-left">{{ item.item }}</td>
          <td class="text-left">{{ item.remain }}</td>
          <td class="text-left">{{ item.cost }}$</td>
          <td class="text-left">{{ item.price }}$</td>
          <td class="text-left">{{ item.quanity }}</td>
          <td class="text-left">{{ item.status }}</td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
</template>

<script>
import moment from "moment";
import DatePicker from "../components/DatePicker.vue";
export default {
  components: { DatePicker },
  data() {
    return {
      imports: [],
      items: [],
    };
  },
  mounted() {
    this.getItem();
    this.getData();
  },
  methods: {
    formatDate(date) {
      return moment(date).format("DD-MM-YYYY");
    },
    getData(date) {
      Meteor.call("findImport", this.form, (error, result) => {
        if (result) this.imports = result;
        else console.log("error", error);
        console.log(result);
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
    OnSubmit(date) {
      // this.imports.push({
      //   date: "01-02-2022",
      //   company: "Grummen",
      //   item: "F-14 Tomcat",
      //   remains: "12",
      //   cost: "80000000",
      //   price: "88000000",
      //   quanity: "100",
      //   status: "active",
      // });
      Meteor.call("findImport", this.form, (error, result) => {
        if (result) this.imports = result;
        else console.log("error", error);
        console.log(result);
      });
    },
  },
};
</script>

<style>
</style>