import express from "express";

import {
  getReviewsByDestination,
  createReview,
  deleteReview,
  likeReview,
} from "../controllers/reviewController.js";

const router = express.Router();

router.get("/:destinationId", getReviewsByDestination);
router.post("/:destinationId", createReview);
router.delete("/:reviewId", deleteReview);
router.patch("/:reviewId/like", likeReview);
export default router;
