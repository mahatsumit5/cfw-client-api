import UserSchema from "./UserSchema.js";

export const insertUser = (userObj) => {
  return UserSchema(userObj).save();
};

export const getUserByEmail = (email) => {
  return UserSchema.findOne({ email });
};

export const getUserByRole = (role) => {
  return UserSchema.find({ role });
};
export const getUserById = (_id) => {
  return UserSchema.findById({ _id });
};
export const getUser = () => {
  return UserSchema.find();
};
export const updateUser = (_id, formData) => {
  return UserSchema.findByIdAndUpdate(_id, formData);
};
