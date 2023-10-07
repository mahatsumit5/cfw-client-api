// const schema = new mongoose.Schema({ any: {} });
import product from "./productSchema.js";
import mongoose from "mongoose";
// const product = mongoose.model("products", {});

export const getProducts = (filter) => {
  return product.find(filter);
};
export const getOneProduct = (_id) => {
  return product.findById(_id);
};

export const getProductsByCatagory = (filter) => {
  const _id = new mongoose.Types.ObjectId(filter);
  return product.find({ parentCat: _id, status: "active" });
};
export const getSingleProduct = (filter) => {
  return product.findOne(filter);
};
export const postReviews = (filter, obj) => {
  console.log(filter, obj);
  return product.findOneAndUpdate(filter, { reviews: obj });
};
