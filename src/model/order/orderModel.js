import orderSchema from "./orderSchema.js";

export const insertOrder = (obj) => {
  return orderSchema(obj).save();
};
