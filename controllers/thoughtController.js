const { Thought, User } = require('../models/Thought');

const thoughtController = {
    
    getThoughts: async (req, res) => {
      try {
        const thoughts = await Thought.find().sort({ createdAt: -1 });
        res.json(thoughts);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
      }
    },

    getSingleThought: async (req, res) => {
        const { id } = req.params;
        try {
          const thought = await Thought.findById(id);
          if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
          }
          res.json(thought);
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Server Error' });
        }
      },

      createThought: async (req, res) => {
        const { thoughtText, username } = req.body;
        try {
          const thought = await Thought.create({ thoughtText, username });
          res.json(thought);
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Server Error' });
        }
      },

      deleteThought: async (req, res) => {
        const { id } = req.params;
        try {
          const thought = await Thought.findByIdAndDelete(id);
          if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
          }
          res.json({ message: 'Thought deleted successfully' });
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Server Error' });
        }
      },

      deleteReaction: async (req, res) => {
        try {
          const { id, reactionId } = req.params;
          const updatedThought = await Thoughts.findByIdAndUpdate(
            id,
            { $pull: { reactions: { _id: reactionId } } },
            { new: true }
          );
          if (!updatedThought) {
            return res.status(404).json({ message: 'Thought not found' });
          }
          res.json(updatedThought);
        } catch (err) {
          console.error(err);
          res.status(500).json({ message: 'Internal server error' });
        }
      },
    };
    
    module.exports = thoughtController;
  