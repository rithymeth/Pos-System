import { Meteor } from "meteor/meteor";
import { Stock, Import, Item, Supplier } from "../collections/collections";

Meteor.methods({
  addStock(doc) {
    let stock = Stock.findOne({ itemId: doc.itemId });
    if (stock) {
      doc.remain = stock.quanity;
      let newDoc = stock;
      newDoc.price = doc.price;
      newDoc.cost = doc.cost;
      newDoc.date = doc.date;
      newDoc.quanity = doc.quanity;
      Stock.update({ _id: stock._id }, { $set: newDoc });
    } else {
      Stock.insert(doc);
      doc.remain = 0;
    }
    return Import.insert(doc);
  },
  findStock() {
    let stocks = [];
    Stock.find()
      .fetch()
      .forEach((it) => {
        let item = Item.findOne({ _id: it.itemId })?.name;
        stocks.push({ ...it, item });
      });
    return stocks;
  },
  findImport() {
    let imports = [];
    Import.find()
      .fetch()
      .forEach((it) => {
        let supplier = Supplier.findOne({ _id: it.supplierId });
        let item = Item.findOne({ _id: it.itemId });
        imports.push({
          ...it,
          company: supplier?.companyName,
          item: item?.name,
        });
      });
    return imports;
  },
});
