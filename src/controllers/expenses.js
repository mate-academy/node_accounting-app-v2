'use strict';

const expensesService = require('../services/expenses');
const usersService = require('../services/users');

const getExpenses = async(req, res) => {
  const expenses = await expensesService.getExpenses(req.query);

  res.status(200).json(expenses);
};

const addExpense = async(req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!userId || !spentAt || !title || !amount || !category || !note) {
    res.status(400).json({ message: 'Missing required fields' });

    return;
  }

  const user = await usersService.getUserById(userId);

  if (!user) {
    res.status(400).json({ message: 'User not found' });

    return;
  }

  const expense = await expensesService.addExpense(req.body);

  res.status(201).json(expense);
};

const getExpenseById = async(req, res) => {
  const { expenseId } = req.params;

  if (!expenseId) {
    res.status(400).json({ message: 'Invalid ID' });

    return;
  }

  const expense = await expensesService.getExpenseById(expenseId);

  if (!expense) {
    res.status(404).json({ message: 'Expense not found' });

    return;
  }

  res.status(200).json(expense);
};

const deleteExpense = async(req, res) => {
  const { expenseId } = req.params;

  if (!expenseId) {
    res.status(400).json({ message: 'Invalid ID' });

    return;
  }

  const isDeleted = await expensesService.deleteExpense(expenseId);

  if (!isDeleted) {
    res.status(404).json({ message: 'Expense not found' });

    return;
  }

  res.status(204).json({ message: 'Expense deleted' });
};

const updateExpense = async(req, res) => {
  const { expenseId } = req.params;

  if (!expenseId) {
    res.status(400).json({ message: 'Invalid ID' });

    return;
  }

  const expense = await expensesService.getExpenseById(expenseId);

  if (!expense) {
    res.status(404).json({ message: 'Expense not found' });

    return;
  }

  const { title, amount, category, note } = req.body;

  if (title) {
    expense.title = title;
  }

  if (amount) {
    expense.amount = amount;
  }

  if (category) {
    expense.category = category;
  }

  if (note) {
    expense.note = note;
  }

  res.status(200).json(expense);
};

module.exports = {
  getExpenses,
  addExpense,
  getExpenseById,
  deleteExpense,
  updateExpense,
};
