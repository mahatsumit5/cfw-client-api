import UserSchema from "./userSchema.js";

export const insertUser = (userObj) => {
  return UserSchema(userObj).save();
};

export const getUserByEmail = (email) => {
  return UserSchema.findOne({ email });
};
export const getAllUsers = () => {
  return UserSchema.find();
};

export const getUserById = (_id) => {
  return UserSchema.findById(_id);
};
export const getOneUser = (filter) => {
  return UserSchema.findOne(filter);
};
export const updateById = (_id, userObj) => {
  return UserSchema.findByIdAndUpdate(_id, userObj);
};
export const updateByEmail = (email, userObj) => {
  return UserSchema.findOneAndUpdate(email, userObj);
};

export const updateUser = (_id, formData) => {
  return UserSchema.findByIdAndUpdate(_id, formData);
};
