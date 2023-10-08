import express from "express";

import {
  getAllUsers,
  getUserById,
  insertUser,
  updateByEmail,
  updateById,
} from "../model/user/userModel.js";
import { comparePass, hashPassword } from "../utils/bcrypt.js";
import { v4 } from "uuid";
import {
  newUserValidation,
  userVerification,
} from "../middleware/joiValidation.js";
import {
  accountVerificationEmail,
  sendPasswordResetLink,
} from "../utils/nodeMailer.js";
import cryptoRandomString from "crypto-random-string";
import { getUserByEmail } from "../model/user/userModel.js";
import { createAccessJWT, createRefreshJWT } from "../utils/jwt.js";
import { auth, refreshAuth } from "../middleware/authMiddleware.js";
import {
  addNewSession,
  findOneAndDelete,
} from "../model/session/sessionModel.js";
const router = express.Router();

router.get("/", auth, (req, res, next) => {
  try {
    res.json({
      status: "success",
      message: "userInfo",
      user: req.userInfo, //coming from auth
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", newUserValidation, async (req, res, next) => {
  try {
    req.body.password = hashPassword(req.body.password);
    req.body.verificationCode = cryptoRandomString({ length: 10 });
    const user = await insertUser(req.body);
    const uuid = v4();
    if (user?._id) {
      const link = `${process.env.WEB_DOMAIN}user-verification?c=${uuid}&&e=${user.email}`;
      const status = await accountVerificationEmail(user, link);
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
        const accessJWT = await createAccessJWT(email);
        const refreshJWT = await createRefreshJWT(email);
        return res.json({
          status: "success",
          message: `Welcome Back ${user.fName} ${user.lName} `,
          token: { accessJWT, refreshJWT },
        });
      } else {
        // wrong credentials provided!
        return res.json({
          status: "warning",
          message: "Password Incorrect",
        });
      }
    }
    res.json({
      status: "info",
      message: `User with Email ID '${email}' doesnot exist`,
    });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
});
// return the refreshJWT
router.get("/get-accessjwt", refreshAuth);

router.post("/get-reset-pass-link", async (req, res, next) => {
  try {
    const token = v4();
    const { email } = req.body;
    const user = await getUserByEmail(email);
    if (user) {
      const result = await addNewSession({
        token,
        associate: email,
      });
      console.log(result);
      if (result?._id) {
        const link = `${process.env.WEB_DOMAIN}reset-password?c=${token}&&e=${email}`;
        // send password reset link to the user to their email
        const isEmailSent = sendPasswordResetLink(user, link);
        console.log(isEmailSent, "email sent-------------------");
        isEmailSent
          ? res.json({
              status: "success",
              message:
                "A link has been sent to your email.Please check your email",
            })
          : res.json({
              status: "error",
              message: "Unable to send link email",
            });
      }
      return;
    }
    res.json({
      status: "error",
      message: "User not found",
    });
  } catch (error) {
    next(error);
  }
});
router.put("/reset-password/:email/:token", async (req, res, next) => {
  try {
    const { password } = req.body;
    const { email, token } = req.params;
    const result = await findOneAndDelete({
      associate: email,
      token,
    });
    console.log(result);
    if (result) {
      const newPassword = hashPassword(password);
      const result = await updateByEmail({ email }, { password: newPassword });
      result?._id
        ? res.json({
            status: "success",
            message: "Your Password Updated Successfully",
          })
        : res.status("401").send("Invalid Token");
    }
  } catch (error) {
    next(error);
  }
});
router.put("/verify", async (req, res, next) => {
  try {
    const { email, code } = req.body;
    console.log(email, code);
    const { verificationCode, _id, isVerified } = await getUserByEmail(email);
    if (isVerified) {
      throw new Error("Already verified");
    }
    if (code === verificationCode) {
      const result = await updateById(_id, {
        status: "active",
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

router.post("/logout", async (req, res, next) => {
  try {
    const { _id, refreshJWT, accessJWT } = req.body;
    console.log(refreshJWT, accessJWT);
    const result = await updateById({ _id }, { token: "" });
    console.log(result);
    if (result?._id) {
      await findOneAndDelete({ accessJWT });
    }

    res.json({
      status: "success",
      successMessage: "Logged out successfully",
    });
  } catch (error) {
    next(error);
  }
});

router.post("/addFav", async (req, res, next) => {
  try {
    const { _id, fav } = req.body;
    if (!_id) {
      return res.json({
        status: "error",
        message: "Please login first.",
      });
    }
    const user = await getUserById({ _id });

    if (user?.favouriteItem.some((item) => item.sku === fav.sku)) {
      console.log("first");
      const newArrayOfFavItem = user.favouriteItem.filter(
        (item) => item._id.toString() !== fav._id
      );
      const result = await updateById(
        { _id },
        { favouriteItem: newArrayOfFavItem }
      );
      result
        ? res.json({
            status: "success",
            message: "Removed from the list",
          })
        : res.json({
            status: "error",
            message: "Error",
          });
      return;
    }

    const result = await updateById(
      { _id },
      { favouriteItem: [...user?.favouriteItem, fav] }
    );
    result
      ? res.json({
          status: "success",
          message: "Added to favourite",
        })
      : res.json({
          status: "error",
          message: "Not able to add to favourite",
        });
  } catch (error) {
    next(error);
  }
});

export default router;
