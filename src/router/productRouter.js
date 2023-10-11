import express from "express";
import {
  getProducts,
  getProductsByCatagory,
  getSingleProduct,
  postReviews,
  updateReviews,
} from "../model/products/productModel.js";
import { getCatagoryByFilter } from "../model/catalogue/catalogue.js";
import mongoose from "mongoose";

const router = express.Router();
router.get("/:slug?/", async (req, res) => {
  try {
    const { slug } = req.params;
    req.params.status = "active";
    const data = slug
      ? await getSingleProduct(req.params)
      : await getProducts({ status: "active" });
    data
      ? res.json({
          status: "success",
          data,
        })
      : res.json({
          status: "error",
          message: `No product found with ${slug}`,
        });
  } catch (error) {
    res.json({ status: "error", error: error.message });
  }
});
router.get("/catagories/:slug", async (req, res) => {
  try {
    const { slug } = req.params;
    const { _id } = await getCatagoryByFilter({ slug });
    const result = await getProductsByCatagory(_id);
    result.length
      ? res.json({
          status: "success",
          result,
        })
      : res.json({
          status: "error",
          message: `No product found with ${slug || "_id"}`,
        });
  } catch (error) {
    res.json({ error });
  }
});

router.put("/post-review", async (req, res, next) => {
  try {
    const { slug, ...rest } = req.body;

    const product = await getSingleProduct({ slug: slug });
    if (product.reviews?.length) {
      req.body = [...product.reviews, rest];
    }
    const result = await postReviews({ slug: slug }, req.body);
    result?._id
      ? res.json({
          status: "success",
          message: "Your review has been posted",
        })
      : res.json({
          status: "error",
          message: "Unable to post your review",
        });
  } catch (error) {
    next(error);
  }
});

router.put("/delete-review", async (req, res, next) => {
  try {
    const { _id, productSlug } = req.body;
    const product = await getSingleProduct({ slug: productSlug });
    const updatedReviews = product.reviews.filter(
      (r) => r._id.toString() !== _id
    );
    const result = await updateReviews({ slug: productSlug }, updatedReviews);

    result?._id
      ? res.json({
          status: "success",
          message: "Review has been deleted",
        })
      : res.json({
          status: "error",
          message: "Unable to post your review",
        });
  } catch (error) {
    next(error);
  }
});
export default router;
