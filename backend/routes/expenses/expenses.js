const { validate } = require("../../models/expenses/expense");
const validator = require("../../middleware/validate");
const {
  getExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
} = require("../../controllers/expenses/expenseController");
const express = require("express");
const router = express.Router();

router.get("/", getExpenses);
router.post("/", validator(validate), createExpense);
router.put("/:id", validator(validate), updateExpense);
router.delete("/:id", deleteExpense);

module.exports = router;
