import { Meteor } from "meteor/meteor";
import { Customer } from "../collections/collections";

Meteor.methods({
  insertCustomer(doc) {
    return Customer.insert(doc);
  },
  findCustomer() {
    return Customer.find().fetch();
  },
  removeCustomer(id) {
    return Customer.remove({ _id: id });
  },
  updateCustomer(doc) {
    return Customer.update({ _id: doc._id }, { $set: doc });
  },
});
