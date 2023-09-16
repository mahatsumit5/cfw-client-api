import express from "express";
import { getCatagories } from "../model/catalogue/catalogue.js";
import { getMainCatagory } from "../model/mainCatagory/mainCat.js";
const router = express.Router();
router.get("/", async (req, res, next) => {
  try {
    const data = await getCatagories();
    const result = await getMainCatagory();
    data
      ? res.status(201).json({ status: "success", data, result })
      : res.sendStatus("403");
  } catch (error) {
    next(error);
  }
});
export default router;
