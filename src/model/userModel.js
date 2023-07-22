import UserSchema from "./UserSchema.js";

export const insertUser = (userObj) => {
  return UserSchema(userObj).save();
};

export const getUserByEmail = (email) => {
  return UserSchema.findOne({ email });
};

export const getUserById = (_id) => {
  return UserSchema.findById(_id);
};
export const updateById = (_id, userObj) => {
  return UserSchema.findByIdAndUpdate(_id, userObj);
};

export const updateUser = (_id, formData) => {
  return UserSchema.findByIdAndUpdate(_id, formData);
};
