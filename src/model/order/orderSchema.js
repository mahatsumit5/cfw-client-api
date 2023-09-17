import mongoose from "mongoose";
const orderSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      default: "pending",
    },
    orderItems: [
      {
        _id: {
          type: mongoose.Types.ObjectId,
        },
        title: {
          type: String,
          required: true,
        },
        slug: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        orderQty: {
          type: Number,
          required: true,
        },

        salesPrice: {
          type: Number,
        },

        description: {
          type: String,
          required: true,
        },
        thumbnail: {
          type: String,
          required: true,
        },
      },
    ],
    payment: {
      totalAmount: {
        type: Number,
        required: true,
      },
      method: {
        type: String,
        required: true,
      },
      isPaid: {
        type: Boolean,
        required: true,
      },
    },
    user: {
      _id: {
        type: mongoose.Types.ObjectId,
        required: true,
      },
      fName: {
        type: String,
        required: true,
      },

      lName: {
        type: String,
        required: true,
      },

      phone: {
        type: String,
        required: false,
      },

      email: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
        default: "",
      },
    },
  },
  { timestamps: true }
);
export default mongoose.model("Order", orderSchema); //Users
