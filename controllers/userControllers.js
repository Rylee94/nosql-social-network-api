const { User, Thought, Reaction } = require("../models");

module.exports = {
  // get all users
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // get a single user
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({
        _id: req.params.userId,
      })
        .populate("friends")
        .populate("thoughts")
        .select("-__v");
      if (!user) {
        return res.status(404).json({ message: "No user with this id!" });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create a new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // update a user by id
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.param.studentId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (!user) {
        res.status(400).json({ message: "No user with this id!" });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // delete a user by id
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });
      if (!user) {
        return res.status(404).json({ message: "No user with this id!" });
      }
      await Thought.deleteMany({ _id: { $in: user.thoughts } });
      res.json({ message: "User and associated thoughts deleted!" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // add a friend to a users friend list
  async addFriend(req, res) {
    try {
      const user = await User.fineOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({
          message: "No user with this id!",
        });
      }
      res.json("Added friend!");
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // remove friend from a users friend list
  async removeFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({ message: "No user with this id!" });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

// const getUsers = (req, res) => {
//     // Logic to retrieve all users
//   };

//   const getSingleUser = (req, res) => {
//     // Logic to retrieve a single user by its userId, with populated thought and friend data
//   };

//   const createUser = (req, res) => {
//     // Logic to create a new user
//   };

//   const updateUser = (req, res) => {
//     // Logic to update a user by its userId
//   };

//   const deleteUser = (req, res) => {
//     // Logic to delete a user by its userId
//   };

//   const addFriend = (req, res) => {
//     // Logic to add a new friend to a user's friend list
//   };

//   const removeFriend = (req, res) => {
//     // Logic to remove a friend from a user's friend list
//   };
