import mongoose, { Mongoose } from "mongoose";

const productSchema = new mongoose.Schema({
  qty: {
    type: Number,
    required: true,
  },

  reviews: [
    {
      title: { type: String, required: true },
      description: { type: String, required: true },
      user: {
        type: mongoose.Types.ObjectId,
        required: true,
      },
    },
  ],
});
export default mongoose.model("products", productSchema);
