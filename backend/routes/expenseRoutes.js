const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware");
const {
  getGroups,
  createGroup,
  getGroupById,
  deleteGroup,
  addExpense,
  deleteExpense,
} = require("../controllers/expenseController");

// All expense routes require authentication
router.use(verifyToken);

// Expense groups CRUD
router.get("/", getGroups);
router.post("/", createGroup);
router.get("/:id", getGroupById);
router.delete("/:id", deleteGroup);

// Expenses management under a group
router.post("/:id/expense", addExpense);
router.delete("/:id/expense/:expenseId", deleteExpense);

module.exports = router;
