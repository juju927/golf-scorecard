const debug = require("debug")("gsc-backend:models:UserModel");

const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const bcrypt = require("bcrypt");
const SALT_ROUNDS = 7;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Please input a username."],
      unique: true,
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      validate: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    },
    name: { type: String, required: [true, "Please input a name."] },
    password: { type: String, trim: true, minLength: 8, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_, ret) => {
        delete ret.password;
        return ret;
      },
    },
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
  return next();
});

module.exports = model("User", userSchema);