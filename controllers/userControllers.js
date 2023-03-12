const { Schema } = require("mongoose");
const { User, Thought } = require("../models");

const UserController = {
  //get users with
  getUsers(req, res) {
    User.find()
      .then((dbUser) => {
        res.json(dbUser);
      })
      .catch((err) => {
        //console.log(err);
        res.status(500).json(err);
      });
  },
  // find a single user based on userID
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .populate({
        path: "thoughts",
        select: "-__v",
      })
      .populate({
        path: "friends",
        select: "-__v",
      })
      .select("-__v")
      .then((dbUser) => {
        !dbUser
          ? res
              .status(404)
              .json({ message: "No user has been found with that ID" })
          : res.json(dbUser);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  //create new user
  createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => {
        res.json(dbUserData);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  // update a user based on the ID
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((dbUser) =>
        !dbUser
          ? res
              .status(404)
              .json({ message: "No user has been found with this ID" })
          : res.json(dbUser)
      )
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  // delete a user based on ID
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((dbUserData) =>
        !dbUserData
          ? res.status(404).json({ message: "No user found with ID" })
          : Thought.deleteMany({ _id: { $in: dbUserData.thoughts } })
      )
      .then((dbUserData) =>
        !dbUserData
          ? res.status(404).json({
              message: "User created but no user was found with this id!",
            })
          : res.json({ message: " successfully deleted user !" })
      )
      .catch((err) => {
        //console.log(err);
        res.status(500).json(err);
      });
  },

  // add a user's friend
  addUserFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((dbUser) => {
        !dbUser
          ? res.status(404).json({ message: "No user with that Id" })
          : res.json(dbUser);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },

  deleteUserFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    )
      .then((dbUser) => {
        !dbUser
          ? res.status(404).json({ message: "No user with that Id" })
          : res.json(dbUser);
      })
      .catch((err) => {
        //console.log(err);
        res.status(500).json(err);
      });
  },
};

module.exports = UserController;