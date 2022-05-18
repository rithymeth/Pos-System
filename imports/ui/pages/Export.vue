<template>
  <div class="q-ma-md">
    <div class="text-center text-h6">Report Export</div>
    <date-picker class="q-mb-md" @submit="getData" />
    <q-markup-table>
      <thead>
        <tr>
          <th class="text-left">N°</th>
          <th class="text-left">Date</th>
          <th class="text-left">Customer</th>
          <th class="text-left">Item</th>
          <th class="text-left">Price</th>
          <th class="text-left">Quantity</th>
          <th class="text-left">Amount</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(sale, index) in sales">
          <template>
            <tr :key="index">
              <td class="text-left">{{ index + 1 }}</td>
              <td class="text-left">{{ formatDate(sale.date) }}</td>
              <td class="text-left">{{ sale.customer }}</td>
              <td class="text-left">{{ sale.items[0].item }}</td>
              <td class="text-left">{{ sale.items[0].price }}$</td>
              <td class="text-left">{{ sale.items[0].qty }}</td>
              <td class="text-left">
                {{ sale.items[0].qty * sale.items[0].price }}$
              </td>
            </tr>
          </template>
          <template v-for="(item, subIndex) in sale.items">
            <tr :key="index + `A` + subIndex" v-if="subIndex > 0">
              <td colspan="3"></td>
              <td class="text-left">{{ item.item }}</td>
              <td class="text-left">{{ item.price }}$</td>
              <td class="text-left">{{ item.qty }}</td>
              <td class="text-left">{{ item.qty * item.price }}$</td>
            </tr>
          </template>
        </template>
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
      sales: [],
    };
  },
  methods: {
    formatDate(date) {
      return moment(date).format("DD-MM-YYYY");
    },
    getData(date) {
      console.log("date", date);
      Meteor.call("getExport", date, (error, result) => {
        if (result) {
          this.sales = result;
        }
      });
    },
  },
};
</script>

<style></style>
