import { Meteor } from "meteor/meteor";
import { Category, Item } from "../collections/collections";

Meteor.methods({
  insertItem(doc) {
    return Item.insert(doc);
  },
  findItem() {
    let data = [];
    let items = Item.find().fetch();
    items.forEach((item) => {
      let category = Category.findOne({ _id: item.categoryId });
      data.push({
        // other way
        _id: item._id,
        name: item.name,
        categoryId: item.categoryId,
        date: item.date,
        description: item.description,
        status: item.status,
        category: category?.name,
      });
    });
    return data;
  },
  removeItem(id) {
    return Item.remove({ _id: id });
  },
  updateItem(edx) {
    return Item.update({ _id: edx._id }, { $set: edx });
  },
});
