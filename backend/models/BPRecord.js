import mongoose from "mongoose";

const bpSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  systolic: Number,
  diastolic: Number,
  pulse: Number,

  date: {
    type: Date,
    default: Date.now
  }

});

export default mongoose.model("BPRecord", bpSchema);