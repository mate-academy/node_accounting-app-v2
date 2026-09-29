const expenseService = require('../services/expenses.service');
const userService = require('../services/users.service');

const getExpenses = (req, res) => {
  let expenses = expenseService.getAllExpenses();
  const { userId, from, to, categories } = req.query;

  if (userId) {
    expenses = expenseService.getExpensesByUser(Number(userId));
  }

  if (from || to) {
    expenses = expenseService.getExpensesBetweenDates(from, to);
  }

  if (categories) {
    expenses = expenseService.getExpenseByCategories(categories);
  }

  res.status(200).json(expenses);
};

const getExpensesForUser = (req, res) => {
  const userId = Number(req.query.userId);
  const expenses = expenseService.getExpensesByUser(userId);

  res.status(200).json(expenses);
};

const createExpense = (req, res) => {
  const { userId, title, amount, category, note, spentAt } = req.body;

  const user = userService.getUserById(userId);

  if (!title || !user) {
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
  const expense = expenseService.getExpenseById(id);

  if (isNaN(id)) {
    return res.sendStatus(400);
  }

  if (!expense) {
    return res.sendStatus(404);
  }

  return res.status(200).json(expense);
};

const deleteExpense = (req, res) => {
  const id = Number(req.params.id);

  const expense = expenseService.getExpenseById(id);

  if (!expense) {
    return res.sendStatus(404);
  }

  res.status(204).json(expenseService.deleteExpense(id));
};

const updateExpense = (req, res) => {
  const id = Number(req.params.id);

  const expense = expenseService.getExpenseById(id);

  if (!expense) {
    return res.sendStatus(404);
  }

  const { spentAt, title, amount, category, note } = req.body;

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
  getExpensesForUser,
  createExpense,
  getExpense,
  deleteExpense,
  updateExpense,
};
