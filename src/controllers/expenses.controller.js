const expenseService = require('../services/expenses.service');
const userService = require('../services/users.service');

const createExpense = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!userId || !spentAt || !title || !amount || !category) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  if (!userService.findUserById(userId)) {
    return res.status(400).json({ message: 'User not found' });
  }

  const newExpense = expenseService.createExpense({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.status(201).json(newExpense);
};

const getExpenses = (req, res) => {
  res.status(200).json(expenseService.getExpenses(req.query));
};

const getExpenseById = (req, res) => {
  const expense = expenseService.findExpenseById(Number(req.params.id));

  if (!expense) {
    return res.status(404).json({ message: 'Expense not found' });
  }
  res.status(200).json(expense);
};

const updateExpense = (req, res) => {
  const expense = expenseService.findExpenseById(Number(req.params.id));

  if (!expense) {
    return res.status(404).json({ message: 'Expense not found' });
  }

  const updatedExpense = expenseService.updateExpense(expense.id, req.body);

  res.status(200).json(updatedExpense);
};

const deleteExpense = (req, res) => {
  const expenseDeleted = expenseService.deleteExpense(Number(req.params.id));

  if (!expenseDeleted) {
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
