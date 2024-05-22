const {
  createExpenseService,
  getExpensesService,
  getExpenseByIdService,
  updateExpenseService,
  deleteExpenseService,
} = require('../services/expenseService');
const { getUserByIdService } = require('../services/userService');

const createExpense = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  const user = getUserByIdService(userId);

  if (!userId || !spentAt || !title || !amount || !category || !user) {
    return res.status(400).json({ message: 'Missing required parameters' });
  }

  const newExpense = createExpenseService(
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  );

  res.status(201).json(newExpense);
};

const getExpenses = (req, res) => {
  const { userId, categories, from, to } = req.query;
  const filteredExpenses = getExpensesService(userId, categories, from, to);

  res.status(200).json(filteredExpenses);
};

const getExpenseById = (req, res) => {
  const expense = getExpenseByIdService(req.params.id);

  if (!expense) {
    return res.status(404).json({ message: 'Expense not found' });
  }
  res.status(200).json(expense);
};

const updateExpense = (req, res) => {
  const { spentAt, title, amount, category, note } = req.body;
  const expense = updateExpenseService(
    req.params.id,
    spentAt,
    title,
    amount,
    category,
    note,
  );

  if (!expense) {
    return res.status(404).json({ message: 'Expense not found' });
  }
  res.status(200).json(expense);
};

const deleteExpense = (req, res) => {
  const success = deleteExpenseService(req.params.id);

  if (!success) {
    return res.status(404).json({ message: 'Expense not found' });
  }
  res.status(204).send();
};

module.exports = {
  createExpense,
  getExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
};
