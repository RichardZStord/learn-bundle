const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
  username: { type: String, required: false },
  hash: { type: String, required: false },
  salt: { type: String, required: true },
  email: { type: String, required: false },
  avatar: {
    data: Buffer,
    contentType: String,
  },
  posts: [{ type: Schema.Types.ObjectId, ref: "Post", required: false }],
});

module.exports = mongoose.model("User", UserSchema);
