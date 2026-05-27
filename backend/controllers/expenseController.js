const ExpenseGroup = require("../models/ExpenseGroup");

// Get all expense groups for the logged-in user
exports.getGroups = async (req, res, next) => {
  try {
    const groups = await ExpenseGroup.find({ createdBy: req.user.id }).sort({ updatedAt: -1 });
    res.json({ success: true, groups });
  } catch (error) {
    next(error);
  }
};

// Create a new expense group
exports.createGroup = async (req, res, next) => {
  try {
    const { name, members } = req.body;

    if (!name || !members || !Array.isArray(members) || members.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide group name and at least one member name.",
      });
    }

    // Clean up members names (trim whitespace, remove empty names)
    const cleanedMembers = members.map(m => m.trim()).filter(m => m.length > 0);
    if (cleanedMembers.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide valid, non-empty member names.",
      });
    }

    const newGroup = new ExpenseGroup({
      name: name.trim(),
      createdBy: req.user.id,
      members: cleanedMembers,
      expenses: [],
    });

    await newGroup.save();
    res.status(201).json({ success: true, group: newGroup });
  } catch (error) {
    next(error);
  }
};

// Get a specific expense group by ID
exports.getGroupById = async (req, res, next) => {
  try {
    const group = await ExpenseGroup.findOne({ _id: req.params.id, createdBy: req.user.id });

    if (!group) {
      return res.status(404).json({
        success: false,
        message: "Expense group not found or access denied.",
      });
    }

    res.json({ success: true, group });
  } catch (error) {
    next(error);
  }
};

// Delete an expense group
exports.deleteGroup = async (req, res, next) => {
  try {
    const group = await ExpenseGroup.findOneAndDelete({ _id: req.params.id, createdBy: req.user.id });

    if (!group) {
      return res.status(404).json({
        success: false,
        message: "Expense group not found or access denied.",
      });
    }

    res.json({ success: true, message: "Expense group deleted successfully." });
  } catch (error) {
    next(error);
  }
};

// Add an expense to a group
exports.addExpense = async (req, res, next) => {
  try {
    const { description, amount, paidBy, category, splitBetween, date } = req.body;

    if (!description || !amount || !paidBy || !splitBetween || !Array.isArray(splitBetween) || splitBetween.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Missing required expense fields: description, amount, paidBy, and splitBetween.",
      });
    }

    const group = await ExpenseGroup.findOne({ _id: req.params.id, createdBy: req.user.id });

    if (!group) {
      return res.status(404).json({
        success: false,
        message: "Expense group not found or access denied.",
      });
    }

    // Validate that payer and all splitting members belong to the group's members list
    if (!group.members.includes(paidBy)) {
      return res.status(400).json({
        success: false,
        message: `Payer '${paidBy}' is not a member of this expense group.`,
      });
    }

    for (const member of splitBetween) {
      if (!group.members.includes(member)) {
        return res.status(400).json({
          success: false,
          message: `Splitting participant '${member}' is not a member of this expense group.`,
        });
      }
    }

    const newExpense = {
      description: description.trim(),
      amount: Number(amount),
      paidBy,
      category,
      splitBetween,
      date: date ? new Date(date) : new Date(),
    };

    group.expenses.push(newExpense);
    await group.save();

    res.status(201).json({ success: true, group });
  } catch (error) {
    next(error);
  }
};

// Delete an expense from a group
exports.deleteExpense = async (req, res, next) => {
  try {
    const { id, expenseId } = req.params;
    const group = await ExpenseGroup.findOne({ _id: id, createdBy: req.user.id });

    if (!group) {
      return res.status(404).json({
        success: false,
        message: "Expense group not found or access denied.",
      });
    }

    const expenseIndex = group.expenses.findIndex(e => e._id.toString() === expenseId);
    if (expenseIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Expense item not found in this group.",
      });
    }

    group.expenses.splice(expenseIndex, 1);
    await group.save();

    res.json({ success: true, group });
  } catch (error) {
    next(error);
  }
};
