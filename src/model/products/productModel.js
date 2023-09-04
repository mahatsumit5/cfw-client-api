import mongoose from "mongoose";

// const schema = new mongoose.Schema({ any: {} });
const prouduct = mongoose.model("products", {});

export const getProducts = (filter) => {
  return prouduct.find(filter);
};
export const getOneProduct = (_id) => {
  return prouduct.findById(_id);
};
export const getProductsByCatagory = (filter) => {
  const _id = new mongoose.Types.ObjectId(filter);
  return prouduct.find({ parentCat: _id, status: "active" });
};
export const getSingleProduct = (filter) => {
  return prouduct.findOne(filter);
};
