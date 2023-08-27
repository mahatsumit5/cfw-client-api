import mongoose from "mongoose";

const sessionSchema = mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
    },
    associate: {
      type: String,
      required: true,
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.model("session", sessionSchema);
