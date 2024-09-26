const expenseService = require('../services/expense.service');
const userService = require('./../services/user.service');

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
    return res.sendStatus(400);
  }

  if (!userId || !spentAt || !title || !amount || !category) {
    return res.sendStatus(400);
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
    return res.status(404).send('Error');
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
    return res.status(404).send('Error');
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
