import mongoose from "mongoose";

const Schema = mongoose.Schema;

const deathReport = new Schema({
  deathPerson: {
    type: Schema.Types.ObjectId,
    ref: "Person",
  },
  reportPerson: {
    type: Schema.Types.ObjectId,
    ref: "Person",
  },
  deathReason: {
    type: String,
  },
  deathDay: {
    type: Date,
  },
  deathPlace: {
    type: String,
  }
});

export default mongoose.model("DeathReport", deathReport);