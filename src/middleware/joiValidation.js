import Joi from "joi";
import { getUserByEmail } from "../model/user/userModel.js";

const SHORTSTE = Joi.string().min(3).max(100);
const SHORTSTEREQ = Joi.string().min(3).max(100).required();
export const newUserValidation = (req, res, next) => {
  try {
    //define the schema

    const schema = Joi.object({
      fName: SHORTSTE.required(),
      lName: SHORTSTE.required(),
      phone: SHORTSTEREQ,
      email: Joi.string()
        .email({
          minDomainSegments: 2, //@ and .
          tlds: { allow: ["com"] },
        })
        .required(),
      password: SHORTSTEREQ.min(8),
      address: SHORTSTEREQ,

      //check data agains the rule
    });
    const { error } = schema.validate(req.body);
    error
      ? res.json({
          status: "error",
          message: error.message,
        })
      : next();
  } catch (error) {
    next(error);
  }
};

export const userVerification = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await getUserByEmail(email);
    if (user) {
      user?.verificationCode === ""
        ? next()
        : res.json({
            status: "info",
            message: "Verify your email first to login",
          });
      return;
    }
    res.json({
      status: "info",
      message: "No match found with that email",
    });
  } catch (error) {
    next(error);
  }
};
