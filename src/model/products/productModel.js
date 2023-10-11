import product from "./productSchema.js";

export const getProducts = (filter) => {
  return product.find(filter);
};
export const getOneProduct = (_id) => {
  return product.findById(_id);
};

export const getProductsByCatagory = (filter) => {
  // const _id = new mongoose.Types.ObjectId(filter);
  return product.find({ parentCat: filter, status: "active" });
};
export const getSingleProduct = (filter) => {
  return product.findOne(filter);
};
export const postReviews = (filter, obj) => {
  return product.findOneAndUpdate(filter, { reviews: obj });
};
export const updateReviews = (filter, obj) => {
  return product.findOneAndUpdate(filter, { reviews: obj }, { new: true });
};
