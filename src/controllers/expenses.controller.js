const expenseService = require('../services/expense.service.js');
const userService = require('../services/user.service.js');

const getExpenseById = async (req, res) => {
  const expenseId = Number(req.params.expenseId);
  const expense = expenseService.getExpenseById(expenseId);

  if (!expense) {
    return res.sendStatus(404);
  }

  res.status(200).json(expense);
};

const getExpenseByFilter = async (req, res) => {
  const expenseId = Number(req.query.expenseId);
  const userId = Number(req.query.userId);
  const categoryName = req.query.categories;
  const dateFrom = req.query.from;
  const dateTo = req.query.to;

  const filterExpenses = {
    expenseId,
    userId,
    categoryName,
    dateFrom,
    dateTo,
  };

  const expense = await expenseService.getExpenseByFilter(filterExpenses);

  if (!expense) {
    return res.status(404).json('Expense not found');
  }

  res.status(200).json(expense);
};

const createExpense = async (req, res) => {
  const validateUser = userService.getById(Number(req.body.userId));

  if (!validateUser) {
    return res.sendStatus(400);
  }

  const expenseData = {
    userId: Number(req.body.userId),
    spentAt: req.body.spentAt,
    title: req.body.title,
    amount: req.body.amount ? Number(req.body.amount) : null,
    category: req.body.category,
    note: req.body.note,
  };

  if (!expenseData.userId) {
    return res.sendStatus(400);
  }

  const expense = await expenseService.createExpense(expenseData);

  res.status(201).json(expense);
};

const updateExpense = async (req, res) => {
  const updateData = {
    id: Number(req.params.expenseId),
    spentAt: req.body.spentAt,
    title: req.body.title,
    amount: req.body.amount,
    category: req.body.category,
    note: req.body.note,
  };

  const updatedExpense = await expenseService.updateExpense(updateData);

  if (!updatedExpense) {
    return res.sendStatus(404);
  }

  res.status(200).json(updatedExpense);
};

const deleteExpense = async (req, res) => {
  const expenseId = Number(req.params.expenseId);
  const deletedExpense = await expenseService.deleteExpense(expenseId);

  if (!deletedExpense) {
    return res.sendStatus(404);
  }

  res.status(204).json(deletedExpense);
};

const expensesController = {
  getExpenseById,
  getExpenseByFilter,
  createExpense,
  updateExpense,
  deleteExpense,
};

module.exports = expensesController;
