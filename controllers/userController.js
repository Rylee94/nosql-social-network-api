const { ObjectId } = require("mongoose").Types;
const { User, Thought } = require("../models");

module.exports = {
  // get all users
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  // get a single user
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({
        _id: req.params.userId,
      });
      await user.populate(["thoughts", "friends"]);
      if (!user) {
        return res.status(404).json({ message: "No user with this id!" });
      }
      res.json(user);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  // create a new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  // update a user by id
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({ message: "No user with this id!" });
      }
      res.json(user);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  // delete a user by id
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });
      if (!user) {
        return res.status(404).json({ message: "No user with this id!" });
      }
      await Thought.deleteMany({ username: user.username });
      res.json({ message: "User and associated thoughts deleted" });
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  // add a friend to a users friend list
  // add a friend to a user's friend list
  async addFriend(req, res) {
    try {
      const friend = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
      );
      if (!friend) {
        return res.status(404).json({
          message: "No user with this id!",
        });
      }
      res.json(friend);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  // remove friend from a users friend list
  // remove friend from a user's friend list
  async removeFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({ message: "No user with this id!" });
      }
      res.json(user);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
};
