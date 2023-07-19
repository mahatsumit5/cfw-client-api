import express from "express";

import { getUserByEmail, insertUser } from "../model/userModel.js";
import { comparePass, hashPassword } from "../utils/bcrypt.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    console.log(req);
    req.body.password = hashPassword(req.body.password);
    const user = await insertUser(req.body);
    user?._id
      ? res.json({
          status: "success",
          message: "Congratulations, New user has been created",
        })
      : res.json({
          status: "error",
          message: " Unable to create user",
        });
  } catch (error) {
    let msg = error.message;
    console.log(msg);
    if (msg.includes("E11000 duplicate key error")) {
      msg = "There is another user who uses this email in the system";
    }
    res.json({
      status: "error",
      message: msg,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);
    const isMatch = comparePass(password, user.password);

    if (isMatch) {
      user.password = undefined;
      return res.json({
        status: "success",
        message: `Welcome Back ${user.fName} ${user.lName} `,
        user,
      });
    } else {
      res.json({
        status: "error",
        message: "no user found",
      });
    }
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
});

export default router;
