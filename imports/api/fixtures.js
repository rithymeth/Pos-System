import { Meteor } from "meteor/meteor";
import { Invoice } from "./collections/collections.js";
import Links from "./collections/Links.js";

Meteor.startup(() => {
  // if the Links collection is empty
  if (Links.find().count() === 0) {
    const data = [
      {
        title: "Do the Tutorial",
        url: "https://www.meteor.com/try",
        createdAt: new Date(),
      },
      {
        title: "Follow the Guide",
        url: "http://guide.meteor.com",
        createdAt: new Date(),
      },
      {
        title: "Read the Docs",
        url: "https://docs.meteor.com",
        createdAt: new Date(),
      },
      {
        title: "Discussions",
        url: "https://forums.meteor.com",
        createdAt: new Date(),
      },
    ];

    data.forEach((link) => Links.insert(link));
  }
  if (Invoice.find().count() === 0) {
    Invoice.insert({
      _id: "invoice",
      number: 1,
    });
  }
  if (Meteor.users.find().count() == 0) {
    let user = {
      username: "unsc",
      email: "unsc@gmail.com",
      phone: "090990729",
      password: "unsc",
      confirmPassword: "unsc",
      role: "admin",
    };
    Meteor.call("insertUser", user, (error, result) => {
      if (result) {
        console.log("create user: ", result);
      }
    });
  }
});
