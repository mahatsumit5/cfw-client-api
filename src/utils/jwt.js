import jwt from "jsonwebtoken";
import { addNewSession } from "../model/session/sessionModel.js";
import { updateByEmail } from "../model/user/userModel.js";
export const createAccessJWT = async (email) => {
  const token = jwt.sign({ email }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "10m",
  });
  await addNewSession({ token, associate: email });
  return token;
};

export const verifyAccessJWT = (token) => {
  return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
};
export const createRefreshJWT = async (email) => {
  const token = jwt.sign({ email }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "30d",
  });
  const data = await updateByEmail({ email }, { token });
  return token;
};
export const verifyRefreshJWT = (token) => {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
};
