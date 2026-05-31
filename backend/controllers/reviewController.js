const Review = require("../models/Review");
const User = require("../models/user");

const getReviewsByDestination = async (req, res) => {
  try {
    const { destinationId } = req.params;

    const reviews = await Review.find({ destinationId }).sort({
      createdAt: -1,
    });

    const averageRating =
      reviews.reduce((acc, item) => acc + item.rating, 0) /
      (reviews.length || 1);

    // NEW: Calculate how many of each star rating exist
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach((review) => {
      // Only count valid 1-5 ratings
      if (distribution[review.rating] !== undefined) {
        distribution[review.rating] += 1;
      }
    });

    res.status(200).json({
      reviews,
      totalReviews: reviews.length,
      averageRating: averageRating.toFixed(1),
      ratingDistribution: distribution, // Send it to the frontend!
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createReview = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { rating, reviewText, travelerType, travelDate } = req.body;
    const { destinationId } = req.params;

    const review = await Review.create({
      destinationId,
      userId: user._id,
      username: user.name, // Override username with User name from DB
      rating,
      reviewText,
      travelerType,
      travelDate: travelDate || new Date(),
    });

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const userId = req.user.id;

    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    const user = await User.findById(userId);
    // Enforce ownership: review.userId matches user's ID, or fallback to username matching for legacy/mock reviews
    const isOwner = (review.userId && review.userId.toString() === userId.toString()) ||
                    (!review.userId && user && review.username === user.name);

    if (!isOwner) {
      return res.status(403).json({ message: "You are not authorized to delete this review" });
    }

    // Only the review owner or an admin can delete it
    const currentUserId = req.user?.userId || req.user?.id;
    const isAdmin = req.user?.role === "admin";
    if (!isAdmin && review.userId && review.userId !== currentUserId) {
      return res.status(403).json({ message: "You can only delete your own reviews" });
    }

    await Review.findByIdAndDelete(reviewId);

    res.status(200).json({ message: "Review deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete review" });
  }
};

const likeReview = async (req, res) => {
  try {
    const { reviewId } = req.params;

    // $inc is a MongoDB command that means "increment this number by 1"
    const updatedReview = await Review.findByIdAndUpdate(
      reviewId,
      { $inc: { likes: 1 } },
      { new: true },
    );

    res.status(200).json(updatedReview);
  } catch (error) {
    res.status(500).json({ message: "Failed to like review" });
  }
};

module.exports = {
  getReviewsByDestination,
  createReview,
  deleteReview,
  likeReview,
};
