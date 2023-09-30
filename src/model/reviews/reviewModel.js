import reviewSchema from "./reviewSchema.js";

export const addReview = (obj) => {
  return reviewSchema(obj).save();
};
