const express = require("express");
const {
  getReviewsByDestination,
  createReview,
  deleteReview,
  likeReview,
} = require("../controllers/reviewController");
const { verifyToken } = require("../middleware/authMiddleware");

const router = express.Router();

// Public: anyone can read reviews
router.get("/:destinationId", getReviewsByDestination);
router.post("/:destinationId", verifyToken, createReview);
router.delete("/:reviewId", verifyToken, deleteReview);
router.patch("/:reviewId/like", verifyToken, likeReview);

module.exports = router;
