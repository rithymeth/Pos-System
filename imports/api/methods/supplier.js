import { Meteor } from "meteor/meteor";
import { Supplier } from "../collections/collections";

Meteor.methods({
  insertSupplier(doc) {
    return Supplier.insert(doc);
  },
  findSupplier() {
    return Supplier.find().fetch();
  },
  removeSupplier(id) {
    return Supplier.remove({ _id: id });
  },
  updateSupplier(edx) {
    return Supplier.update({ _id: edx._id }, { $set: edx });
  },
});
