import { Meteor } from "meteor/meteor";
import moment from "moment";
import { Stock, Sale, Customer, Invoice } from "../collections/collections";

Meteor.methods({
  async onSale(doc) {
    console.log("it", doc);
    let sale = Sale.insert(doc);
    doc.items.forEach((it) => {
      let oldStock = Stock.findOne({ _id: it._id });
      oldStock.qty -= it.qty;
      let newStock = oldStock;
      Stock.update({ _id: it._id }, { $set: newStock });
    });
    Invoice.update(
      { _id: "invoice" },
      {
        $set: {
          number: doc.invoiceNumber + 1,
        },
      }
    );
    return sale;
  },
  getExport(date) {
    console.log("date", date);

    let exports = Sale.find().fetch();
    let data = [];
    exports.forEach((it) => {
      console.log("date1", moment(it.date).format("LLL"));
      let customer = Customer.findOne({ _id: it.customerId })?.name;
      if (
        moment(it.date) >= moment(date.fromDate) &&
        moment(it.date) <= moment(date.toDate)
      ) {
        data.push({ ...it, customer });
      } else {
      }
    });
    return data;
  },
});
