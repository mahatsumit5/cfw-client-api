import express from "express";
import { getPaymentMethods } from "../model/payment/paymentMethods.js";
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const result = await getPaymentMethods();
    result
      ? res.status(201).json({ status: "success", result })
      : res.sendStatus("404");
  } catch (error) {
    next(error);
  }
});
export default router;
