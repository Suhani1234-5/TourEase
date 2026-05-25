const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    destinationId: {
      type: String,
      required: true,
    },

    username: {
      type: String,
      required: true,
      trim: true, // Automatically removes accidental extra spaces at the start/end
      match: [/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"], // Blocks numbers/symbols!
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    reviewText: {
      type: String,
    },
    travelerType: {
      type: String,
      default: "Solo",
    },
    travelDate: {
      type: Date,
    },
    likes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Review", reviewSchema);
