import mongoose from "mongoose";

const medicineSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  name: String,

  time: String

});

export default mongoose.model("Medicine", medicineSchema);