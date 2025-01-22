const expenseService = require('../services/expense.service.js');
const userService = require('./../services/user.service.js');

const getExpenses = (req, res) => {
  const { userId, categories, from, to } = req.query;
  const expenses = expenseService.getAllExp(userId, categories, from, to);

  res.status(200).send(expenses);
};

const getOneExpense = (req, res) => {
  const { id } = req.params;
  const expense = expenseService.getExpById(id);

  if (!expense) {
    return res.status(404).send('Not found');
  }
  res.send(expense);
};

const createExpense = (req, res) => {
  const { userId, title, amount, category, spentAt } = req.body;

  const user = userService.getUserById(+userId);

  if (!user) {
    return res.status(400).send('User not found');
  }

  if (!userId || !spentAt || !title || !amount || !category) {
    return res.status(400).send('Missing required parameters');
  }

  const expense = expenseService.createExp({
    userId,
    title,
    amount,
    category,
    spentAt,
    note: req.body.note || '',
  });

  res.status(201).send(expense);
};

const updateExpense = (req, res) => {
  const { id } = req.params;
  const { title, amount, category, spentAt, note } = req.body;

  const expense = expenseService.getExpById(id);

  if (!expense) {
    return res.status(404).send('Expense not found');
  }

  const updatedExpense = expenseService.updateExp(id, {
    title: title !== undefined ? title : expense.title,
    amount: amount !== undefined ? amount : expense.amount,
    category: category !== undefined ? category : expense.category,
    spentAt: spentAt !== undefined ? spentAt : expense.spentAt,
    note: note !== undefined ? note : expense.note,
  });

  res.status(200).send(updatedExpense);
};

const removeExpense = (req, res) => {
  const { id } = req.params;

  if (!expenseService.getExpById(id)) {
    return res.status(404).send('Expense not found');
  }

  expenseService.removeExp(id);
  res.sendStatus(204);
};

module.exports = {
  getExpenses,
  getOneExpense,
  createExpense,
  updateExpense,
  removeExpense,
};
