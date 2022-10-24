import mongoose from "mongoose";

const Schema = mongoose.Schema;

const collectStatus = new Schema({
  money: {
    type: Schema.Types.ObjectId,
    ref: "Money",
  },
  household: {
    type: Schema.Types.ObjectId,
    ref: "Household",
  },
  paidMoney: {
    type: Number,
  },
  paidHistory: [
    {
      value: {
        type: Number,
      },
      paidDate: {
        type: Date,
      }
    }
  ],
});

export default mongoose.model("CollectStatus", collectStatus);