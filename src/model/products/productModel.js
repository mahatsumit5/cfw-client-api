import mongoose from "mongoose";

// const schema = new mongoose.Schema({ any: {} });
const prouduct = mongoose.model("products", {});

export const getProducts = () => {
  return prouduct.find();
};
export const getOneProduct = (_id) => {
  return prouduct.findById(_id);
};
export const getProductsByCatagory = (filter) => {
  const _id = new mongoose.Types.ObjectId(filter);
  return prouduct.find({ parentCat: _id });
};
export const getSingleProduct = (filter) => {
  return prouduct.findOne(filter);
};
