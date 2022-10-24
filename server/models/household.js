import mongoose from "mongoose";

const Schema = mongoose.Schema;

const householdSchema = new Schema({
  headMember: {
    type: Schema.Types.ObjectId,
    ref: "Person",
  },
  members: [
    {
      memberId: {
        type: Schema.Types.ObjectId,
        ref: "Person",
      },
    },
  ],
  apartmentNumber: {
    type: Number,
  },
  place: {
    type: String,
  },
  change: [
    {
      content: {
        type: String,
      },
      date: {
        type: Date,
      },
    },
  ],
});

export default mongoose.model("Household", householdSchema);
