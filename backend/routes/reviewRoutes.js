const express = require("express");
const {
  getReviewsByDestination,
  createReview,
  deleteReview,
  likeReview,
} = require("../controllers/reviewController");

const router = express.Router();

router.get("/:destinationId", getReviewsByDestination);
router.post("/:destinationId", createReview);
router.delete("/:reviewId", deleteReview);
router.patch("/:reviewId/like", likeReview);

module.exports = router;
