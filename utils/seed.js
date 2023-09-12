const connection = require("../config/connection");
const { User, Thought } = require("../models");
const { users, thoughts } = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");
  //delete the collections if they exist
  let userCheck = await connection.db
    .listCollections({ name: "users" })
    .toArray();
  if (userCheck.length) {
    await connection.dropCollection("users");
  }

  //   let thoughtCheck = await connection.db
  //     .listCollections({ name: "thoughts" })
  //     .toArray();
  //   if (thoughtCheck.length) {
  //     await connection.dropCollection("thoughts");
  //   }
  // Add users  to the collection and await the results

  await User.collection.insertMany(users);
  console.log("users added successfully");

  await Thought.collection.insertMany(thoughts);
  console.log("Thoughts added successfully");

  connection.close();
});
