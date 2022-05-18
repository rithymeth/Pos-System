import { Mongo } from "meteor/mongo";
export const Customer = new Mongo.Collection("customers");
export const Category = new Mongo.Collection("category");
export const Supplier = new Mongo.Collection("supplier");
export const Item = new Mongo.Collection("item");
export const Stock = new Mongo.Collection("stock");
export const Import = new Mongo.Collection("import");
export const Sale = new Mongo.Collection("sale");
export const Invoice = new Mongo.Collection("invoice");