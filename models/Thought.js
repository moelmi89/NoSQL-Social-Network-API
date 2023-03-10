const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction')

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: STRING,
      required: true,
      minlength:1,
      maxlength: 280,
    },
    createdAt: {
      type: DATE,
      default: new Date(),
    },
    username: {
        type: STRING,
        required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

const Thoughts = model('Thoughts', thoughtSchema)

module.exports = Thoughts;