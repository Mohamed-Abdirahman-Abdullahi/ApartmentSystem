const Joi = require("joi");
const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    account: {
      type: String,
      required: true,
      min: 2,
      max: 255,
    },
    number: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
      min: 2,
      max: 255,
    },
    type: {
      type: String,
      required: true,
      min: 2,
      max: 255,
    },

    category: {
      type: String,
      required: true,
      min: 2,
      max: 255,
    },
    memo: {
      type: String,
      min: 2,
      max: 255,
    },
    receiptNo: {
      type: String,
      required: true,
      unique: true,
    },
    amount: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Expense = mongoose.model("Expense", expenseSchema);

const validate = (expense) => {
  const schema = Joi.object({
    account: Joi.string().min(2).max(255).required(),
    number: Joi.string().required(),
    description: Joi.string().min(2).max(255).required(),
    type: Joi.string().min(2).max(255).required(),
    category: Joi.string().min(2).max(255).required(),
    memo: Joi.string().min(2).max(255),
    receiptNo: Joi.string().required(),
    amount: Joi.string().required(),
  });

  return schema.validate(expense);
};

module.exports = {
  Expense,
  validate,
};
