import mongoose from "mongoose";
const paymentMethods = new mongoose.model("paymentoptions", {});
export const getPaymentMethods = () => {
  return paymentMethods.find({ status: "active" });
};
