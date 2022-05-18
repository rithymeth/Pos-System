import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";

Meteor.methods({
  insertUser(doc) {
    return Accounts.createUser({
      username: doc.username,
      password: doc.password,
      email: doc.email,
      profile: {
        phone: doc.phone,
        role: doc.role,
      },
    });
  },
  findUser() {
    let users = [];
    Meteor.users
      .find()
      .fetch()
      .forEach((it) => {
        let doc = {
          _id: it._id,
          username: it.username,
          email: it.emails[0].address,
          phone: it.profile.phone,
          role: it.profile.role,
        };
        users.push(doc);
      });
    return users;
  },
  removeUser(id) {
    return Meteor.users.remove({ _id: id });
  },
  updateUser(doc) {
    if (doc.reset) {
      Accounts.setPassword(doc._id, doc.password);
    }
    let emails = Meteor.users.findOne({ _id: doc._id }).emails;
    emails[0].address = doc.email;
    return Meteor.users.update(
      { _id: doc._id },
      {
        $set: {
          username: doc.username,
          emails: emails,
          profile: {
            role: doc.role,
            phone: doc.phone,
          },
        },
      }
    );
  },
});
