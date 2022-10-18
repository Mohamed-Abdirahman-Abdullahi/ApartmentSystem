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
router.post("/", createExpense);
router.put("/:id", validator(validate), updateExpense);
router.delete("/:id", validator(validate), deleteExpense);

module.exports = router;
