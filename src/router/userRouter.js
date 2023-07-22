import express from "express";

import { getUserByEmail, insertUser, updateById } from "../model/userModel.js";
import { comparePass, hashPassword } from "../utils/bcrypt.js";
import { v4 } from "uuid";
import { newUserValidation } from "../middleware/joiValidation.js";
import { accountVerificationEmail } from "../utils/nodeMailer.js";
const router = express.Router();

router.post("/", newUserValidation, async (req, res, next) => {
  try {
    req.body.password = hashPassword(req.body.password);
    req.body.verificationCode = v4();
    const user = await insertUser(req.body);
    if (user?._id) {
      const link = `${process.env.WEB_DOMAIN}/user-verification?c=${user.verificationCode}&&e=${user.email}`;
      const status = await accountVerificationEmail(user, link);
      console.log(status);
      res.json({
        status: "success",
        message: "Account Created.",
      });
      return;
    }

    res.json({
      status: "error",
      message: " Unable to create user",
    });
  } catch (error) {
    let msg = error.message;
    if (msg.includes("E11000 duplicate key error")) {
      msg = "There is another user who uses this email in the system";
    }
    next(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);
    if (user) {
      const isMatch = comparePass(password, user?.password);
      if (isMatch) {
        user.password = undefined;
        return res.json({
          status: "success",
          message: `Welcome Back ${user.fName} ${user.lName} `,
          user,
        });
      } else {
        // wrong credentials provided!
        res.json({
          status: "warning",
          message: "Password Incorrect",
        });
      }
    } else {
      //User not found

      res.json({
        status: "info",
        message: `User with Email ID '${email}' doesnot exist`,
      });
    }
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
});

router.put("/verify", async (req, res, next) => {
  try {
    const { email, code } = req.body;
    const { verificationCode, _id, isVerified } = await getUserByEmail(email);
    if (isVerified) {
      throw new Error("Already verified");
    }
    if (code === verificationCode) {
      const result = await updateById(_id, {
        isVerified: true,
        verificationCode: "",
      });
      result?._id
        ? res.json({
            status: "success",
            message: "Account Verified",
          })
        : res.json({
            status: "error",
            message: "Invalid Code",
          });
      return;
    }
  } catch (error) {
    next(error);
  }
});

export default router;
