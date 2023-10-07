import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    reviews: [
      {
        title: { type: String, required: true },
        description: { type: String, required: true },
        user: {
          type: mongoose.Types.ObjectId,
          required: true,
        },
        rating: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);
export default mongoose.model("products", productSchema);
