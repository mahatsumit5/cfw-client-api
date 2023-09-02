import express from "express";
import { getCatagories } from "../model/catalogue/catalogue.js";
const router = express.Router();
router.get("/", async (req, res, next) => {
  try {
    const data = await getCatagories();
    data
      ? res.status(201).json({ status: "success", data })
      : res.sendStatus("403");
  } catch (error) {
    next(error);
  }
});
export default router;
