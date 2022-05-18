import { Meteor } from "meteor/meteor";
import { Invoice } from "../collections/collections";

Meteor.methods({
  invoiceNumber() {
    let invoice = Invoice.findOne({ _id: "invoice" });
    console.log("invoice", invoice);
    if (invoice) {
      return invoice?.number;
    } else {
      return 1;
    }
  },
});
