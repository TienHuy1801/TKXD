import mongoose from "mongoose";

const Schema = mongoose.Schema;

const personSchema = new Schema({ 
  household: {
    type: Schema.Types.ObjectId,
    ref: "Household",
  },
  identity: {
    type: Schema.Types.ObjectId,
    ref: "Identity",
  },
  deathReport: {
    type: Schema.Types.ObjectId,
    ref: "DeathReport",
  },
  name: {
    type: String,
  },
  aliases: {
    type: String,
  },
  gender: {
    type: Number,
  },
  dateOfBirth: {
    type: Date,
  },
  birthPlace: {
    type: String,
  },
  nation: {
    type: String,
  },
  job: {
    type: String,
  },
  jobAddress: {
    type: String,
  },
  relationship: {
    type: Number,
  },
  note: {
    type: Number,
    default: 0,
  },
  residencyHistory: [
    {
      place: {
        type: String,
      },
      date: {
        type: Date,
      },
      note: {
        type: String,
      },
    },
  ],
});

export default mongoose.model("Person", personSchema);
