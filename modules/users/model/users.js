const { model, Schema } = require("mongoose");

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    address: { type: String, required: true },
    email: { type: String, trim: true },
    password: { type: String, required: true },
    number: { type: String, required: true },
    favorites: [{ type: String }],
  },
  { timestamps: true }
);

const Users = model("User", userSchema);
module.exports = Users;
