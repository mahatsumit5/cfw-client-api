import mongoose from "mongoose";
const mainCatagory = new mongoose.model("mainCat", {});
export const getMainCatagory = () => {
  return mainCatagory.find();
};
