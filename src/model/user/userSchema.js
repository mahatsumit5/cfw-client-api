import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      default: "inactive",
    },

    fName: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
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
      unique: true,
      index: 1,
    },

    password: {
      type: String,
      required: true,
    },
    verificationCode: {
      type: String,
      default: "",
    },

    address: {
      type: String,
      required: true,
      default: "",
    },
    profile: {
      type: String,
      required: false,
    },
    token: {
      type: String,
      required: false,
      default: "",
    },
    favouriteItem: [
      {
        type: mongoose.Types.ObjectId,
        required: false,
        unique: true,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema); //Users
