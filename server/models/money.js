import mongoose from "mongoose";

const Schema = mongoose.Schema;

const moneySchema = new Schema({
  name: {
    type: String,
  },
  startDate: { 
    type: Date,
  },
  cycle: {
    type: {
      type: String,
    },
    value: {
      type: Number,
    }
  },
  note: {
    type: String,
  },
  amountOfMoney: {
    type: Number,
  },
  moneyType: {
    type: Number,
  }
});

export default mongoose.model("Money", moneySchema);
