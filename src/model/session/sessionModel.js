import sessionSchema from "./sessionSchema.js";

export const addNewSession = (obj) => {
  return sessionSchema(obj).save();
};
export const findOneAndDelete = (filter) => {
  return sessionSchema.findOneAndDelete(filter);
};
