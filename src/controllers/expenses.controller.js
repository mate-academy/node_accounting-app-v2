const expenseService = require('../services/expenses.service');
const userService = require('../services/users.service');

const getExpenses = (req, res) => {
  let expenses = expenseService.getAllExpenses();
  const { userId, from, to, categories } = req.query;

  if (userId) {
    expenses = expenseService.getExpensesByUser(expenses, Number(userId));
  }

  if (from || to) {
    expenses = expenseService.getExpensesBetweenDates(expenses, from, to);
  }

  if (categories) {
    expenses = expenseService.getExpenseByCategories(expenses, categories);
  }

  res.status(200).json(expenses);
};

const createExpense = (req, res) => {
  const { userId, title, amount, category, note, spentAt } = req.body;

  const user = userService.getUserById(userId);

  if (!title || !user || !amount || !category || !note || !spentAt) {
    return res.sendStatus(400);
  }

  const newExpense = {
    id: Date.now(),
    userId,
    spentAt: spentAt || new Date().toISOString(),
    title,
    amount,
    category,
    note,
  };

  res.status(201).json(expenseService.createExpense(newExpense));
};

const getExpense = (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.sendStatus(400);
  }

  const expense = expenseService.getExpenseById(id);

  if (!expense) {
    return res.sendStatus(404);
  }

  return res.status(200).json(expense);
};

const deleteExpense = (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.sendStatus(400);
  }

  const expense = expenseService.getExpenseById(id);

  if (!expense) {
    return res.sendStatus(404);
  }

  expenseService.deleteExpense(id);

  res.sendStatus(204);
};

const updateExpense = (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.sendStatus(400);
  }

  const expense = expenseService.getExpenseById(id);

  if (!expense) {
    return res.sendStatus(404);
  }

  const { title, amount, category, note, spentAt } = req.body;

  if (!title) {
    return res.sendStatus(400);
  }

  const updatedExpense = expenseService.updateExpense({
    ...expense,
    spentAt: spentAt ?? expense.spentAt,
    title,
    amount: amount ?? expense.amount,
    category: category ?? expense.category,
    note: note ?? expense.note,
  });

  return res.status(200).json(updatedExpense);
};

module.exports = {
  getExpenses,
  createExpense,
  getExpense,
  deleteExpense,
  updateExpense,
};
