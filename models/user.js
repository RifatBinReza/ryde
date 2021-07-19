const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
var validator = require("validator");

module.exports = (mongoose) => {
  const userSchema = new mongoose.Schema(
    {
      _id: {
        type: String,
        default: () => uuidv4(),
      },

      name: {
        type: String,
        required: true,
      },

      username: {
        type: String,
        required: true,
      },

      dob: {
        type: Date,
        required: true,
      },

      address: {
        type: String,
        ref: "Address",
      },

      description: {
        type: String,
        required: false,
      },

      email: {
        type: String,
        required: true,
        unique: true,
        set: (val) => val.toLowerCase(),
        validate: {
          validator(val) {
            return validator.isEmail(val);
          },
          message: (props) => `${props.value} is not a valid email!`,
        },
      },

      password: {
        type: String,
        required: true
      },

      lastLogin: {
        type: Date,
      },
      following: [
        {
          user: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
          },
        },
      ],
      followers: [
        {
          user: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
          },
        },
      ],
    },
    {
      timestamps: true,
    }
  );

  userSchema.statics.generatePasswordHash = async function (password) {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  };

  userSchema.methods.validatePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };

  const user = mongoose.model("User", userSchema);

  return user;
};
