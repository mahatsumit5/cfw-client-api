import mongoose from "mongoose";
const catagories = new mongoose.model("categories", {});
export const getCatagories = () => {
  return catagories.find({ status: "active" });
};
export const getCatagoryByFilter = (filter) => {
  return catagories.findOne(filter);
};
