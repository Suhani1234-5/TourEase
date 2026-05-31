const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    trim: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  paidBy: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ["Food", "Transit", "Lodging", "Activities", "Other"],
    default: "Other",
  },
  splitBetween: {
    type: [String],
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  }
});

const expenseGroupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    members: {
      type: [String],
      required: true,
      validate: {
        validator: function (v) {
          return v && v.length >= 1;
        },
        message: "An expense group must have at least one member.",
      },
    },
    expenses: [expenseSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("ExpenseGroup", expenseGroupSchema);
