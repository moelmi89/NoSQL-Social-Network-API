const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      max_length: 50,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please provide a valid email address'],
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought',
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        }
    ]
  },
  {
    toJSON: {
        virtuals: true,
    },
    id: false,
  }
);

userSchema.virtual('friendCount')
  .get(function () {
    return this.friends.length;
  });

  const User = model('User', userSchema);

module.exports = User;