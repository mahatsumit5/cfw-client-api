import mongoose from "mongoose";

const prouduct = mongoose.model("products", {});
export const getProducts = () => {
  return prouduct.find();
};
