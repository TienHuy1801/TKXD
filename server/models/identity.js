import mongoose from "mongoose";

const Schema = mongoose.Schema;

const identitySchema = new Schema({
  numberIdentity: {
    type: String,
  },
  dateOfIssue: {
    type: Date,
  },
  placeOfIssue: {
    type: String,
  },
})

export default mongoose.model("Identity", identitySchema);