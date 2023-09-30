import express from "express";
import { addReview } from "../model/reviews/reviewModel.js";

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    console.log(req.body);
    // await addReview(req.body);
  } catch (error) {
    next(error);
  }
});
export default router;
