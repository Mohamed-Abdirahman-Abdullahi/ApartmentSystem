const { Expense } = require("../../models/expenses/expense");

const createExpense = async (req, res) => {
  let expense = await Expense.findOne({ receiptNo: req.body.receiptNo });
  if (expense) return res.status(400).send("receipt already proccessed");

  expense = await Expense.create({
    account: req.body.account,
    number: req.body.number,
    description: req.body.description,
    type: req.body.type,
    category: req.body.category,
    receiptNo: req.body.receiptNo,
    memo: req.body.memo,
    amount: req.body.amount,
  });

  res.send(expense);
};

const updateExpense = async (req, res) => {
  let expense = await Expense.findOne({ receiptNo: req.body.receiptNo });
  if (expense) return res.status(400).send("receipt already proccessed");

  expense = await Expense.findByIdAndUpdate(
    req.params.id,
    {
      account: req.body.account,
      number: req.body.number,
      description: req.body.description,
      type: req.body.type,
      category: req.body.category,
      receiptNo: req.body.receiptNo,
      memo: req.body.memo,
      amount: req.body.amount,
    },
    { new: true }
  );

  if (!expense) return res.status(400).send("sorry invalid update");

  res.send(expense);
};

const deleteExpense = async (req, res) => {
  const expense = await Expense.findByIdAndRemove(req.params.id);
  if (!expense) return res.status(400).send("sorry invalid delete");

  res.send(expense);
};

const getExpenses = async (req, res) => {
  const expenses = await Expense.find();

  res.send(expenses);
};

module.exports = {
  createExpense,
  updateExpense,
  deleteExpense,
  getExpenses,
};
