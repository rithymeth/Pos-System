<template>
  <div id="print">
    <q-card flat>
      <q-card-section>
        <div class="row">
          <div class="col text-center">
            <div class="text-h6">Master IT-Shop</div>
            <div class="text-h6">សង្កាត់រតនះ ស្រុកបាត់ដំបង ខែត្តបាត់ដំបង</div>
            <div class="text-h6">
              លក់ទំនិញគ្រប់ប្រភេទ 017 292 912/069 292 912
            </div>
            <div class="text-h6">
              អតិថិជន: {{ data.customer }} | ថ្ងៃទី : {{ data.date }} |
              លេខវីក៍យប៍ត្រ: {{ data.invoiceNumber }}
            </div>
          </div>
        </div>
      </q-card-section>
      <q-markup-table>
        <thead>
          <tr>
            <th>No</th>
            <th>Item</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Amout</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in data.items" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.qty }}</td>
            <td>{{ item.price }}</td>
            <td>{{ item.qty * item.price }}</td>
          </tr>
          <tr>
            <td colspan="4">Total</td>
            <td colspan="4">{{ total() }}</td>
          </tr>
        </tbody>
      </q-markup-table>
    </q-card>
  </div>
</template>

<script>
import printJS from "print-js";
export default {
  data() {
    return {
      data: {
        items: [],
      },
    };
  },
  mounted() {
    this.data = this.$route.params.documents;
    console.log("data", this.data);
    setTimeout(() => {
      printJS({
        printable: "print",
        type: "html",
        targetStyles: ["*"],
      });
      this.$emit("close");
      this.$router.back();
    }, 1000);
  },

  methods: {
    total() {
      let amount = 0;
      this.data.items.forEach((doc) => {
        amount += doc.price * doc.qty;
      });
      return amount;
    },
  },
};
</script>

<style>
</style>