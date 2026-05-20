import Review from "../models/Review.js";

export const getReviewsByDestination = async (req, res) => {
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

export const createReview = async (req, res) => {
  try {
    const review = await Review.create(req.body);

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params; // Grab the ID from the URL

    await Review.findByIdAndDelete(reviewId);

    res.status(200).json({ message: "Review deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete review" });
  }
};

export const likeReview = async (req, res) => {
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
