import orderSchema from "./orderSchema.js";

export const insertOrder = (obj) => {
  return orderSchema(obj).save();
};

export const getOrderById = (_id) => {
  return orderSchema.findById(_id);
};
