const { Thought, User } = require("../models");

const thController = {
  //get thoughts
  getThoughts(req, res) {
    Thought.find()
      .then((dbThought) => {
        res.json(dbThought);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  // get single thought by Id
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((dbThought) =>
        !dbThought
          ? res.status(404).json({ message: "No thought with that Id" })
          : res.json(dbThought)
      )
      .catch((err) => {
        //console.log(err)
        res.status(500).json(err);
      });
  },
  // create a new thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((dbThought) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: dbThought._id } },
          { new: true }
        );
      })
      .then((dbUser) =>
        !dbUser
          ? res.status(404).json({
              message: "No user found with that ID, thought has been created",
            })
          : res.json("successfully created thought")
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  //Update Thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((dbThought) =>
        !dbThought
          ? res.status(404).json({ message: "No thought with this id!" })
          : res.json(dbThought)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // Delete Thought
  // deleteThought(req, res) {
  //   Thought.findOneAndRemove({ _id: req.params.thoughtsId })
  //     .then((dbThought) =>
  //       !dbThought
  //         ? res
  //             .status(404)
  //             .json({ message: "No thought has been found with this id" })
  //         : User.findOneAndUpdate(
  //             { thoughts: req.params.thoughtsId },
  //             { $pull: { thoughts: req.params.thoughtsId } },
  //             { new: true }
  //           )
  //     )
  //     .then((dbUser) =>
  //       !dbUser
  //         ? res
  //             .status(404)
  //             .json({ message: "Thought created but no user with this id!" })
  //         : res.json({ message: "Thought successfully deleted!" })
  //     )
  //     .catch((err) => {
  //       res.status(500).json(err);
  //     });
  // },
  deleteThought(req, res) {
    console.log(req.params);

    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((dbThought) => {
        if (!dbThought) {
          return res
            .status(404)
            .json({ message: "No thought has been found with this id" });
        }
        return User.findOneAndUpdate(
          { thoughts: req.params.thoughtId },
          { $pull: { thoughts: req.params.thoughtId } },
          { new: true }
        );
      })
      .then((dbUser) => {
        if (!dbUser) {
          return res
            .status(404)
            .json({ message: "Thought created but no user with this id!" });
        }
        res.json({ message: "Thought successfully deleted!" });
      })
      .catch((err) => {
        console.log(err);
        // res.status(500).json(err);
      });
  },
  // Add a Thought reaction to exisiting thought
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reaction: req.body } },
      { runValidators: true, new: true }
    )
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: "No thought with this id!" });
        }
        return res.json(thought);
      })
      .catch((err) => res.status(500).json(err));
  },
  // Delete a reaction to an existing thought
  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reaction: { userId: req.params.userId } } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with this id!" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
};

module.exports = thController;