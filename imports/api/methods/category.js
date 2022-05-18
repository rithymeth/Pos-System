import { Meteor } from "meteor/meteor";
import { Category } from "../collections/collections";

Meteor.methods({
  insertCategory(doc) {
    return Category.insert(doc);
  },
  findCatecory() {
    return Category.find().fetch();
  },
  removeCategory(id) {
    return Category.remove({ _id: id });
  },
  updateCategory(edx) {
    return Category.update({ _id: edx._id }, { $set: edx });
  },
});
