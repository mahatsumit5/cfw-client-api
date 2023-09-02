import express from "express";
import { getProducts } from "../model/products/productModel.js";

const router = express.Router();
router.get("/", async (req, res) => {
  try {
    const data = await getProducts();
    data
      ? res.json({
          data,
        })
      : res.status(401).send("No Data Found");
  } catch (error) {
    res.json({ error });
  }
});
export default router;
