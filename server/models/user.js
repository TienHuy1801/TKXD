import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  fullname: {
    type: String,
  },
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  role: {
    type: Number,
  },
})

export default mongoose.model("User", userSchema);