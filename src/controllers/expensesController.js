'use strict';

const expensesService = require('../services/expensesService');
const userService = require('../services/userService');

const getAllExpenses = async (req, res) => {
  const { userId, from, to, categories } = req.query;

  if (userId && !userService.getUserById(parseInt(userId))) {
    return res.status(400).send('User not found');
  }

  const expenses = await expensesService.getExpenses({
    userId: userId ? Number(userId) : undefined,
    from,
    to,
    categories,
  });

  res.json(expenses);
};

const getExpense = async (req, res) => {
  const expense = await expensesService.getExpensesById(
    parseInt(req.params.id, 10),
  );

  if (!expense) {
    return res.status(404).send('Expense not found');
  }

  res.json(expense);
};

const createExpense = async (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!userId || !spentAt || !title || !amount || !category) {
    return res
      .status(400)
      .send(
        `Fields ${userId}, ${spentAt}, ${title}, ${amount}, ${category} is required`,
      );
  }

  if (!userService.getUserById(parseInt(userId))) {
    return res.status(400).send('User not found');
  }

  const expense = await expensesService.createExpense(
    Number(userId),
    spentAt,
    title,
    amount,
    category,
    note,
  );

  res.status(201).json(expense);
};

const deleteExpense = async (req, res) => {
  const deletedExpense = await expensesService.deleteExpenseById(
    parseInt(req.params.id, 10),
  );

  if (!deletedExpense) {
    return res.sendStatus(404);
  }

  res.sendStatus(204);
};

const updateExpense = async (req, res) => {
  const { spentAt, title, amount, category, note } = req.body;

  const expense = await expensesService.getExpensesById(
    parseInt(req.params.id, 10),
  );

  if (!expense) {
    return res.status(404).send('Expense not found');
  }

  const updatedExpense = await expensesService.updateExpenseById({
    id: parseInt(req.params.id, 10),
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.json(updatedExpense);
};

module.exports = {
  getAllExpenses,
  getExpense,
  createExpense,
  deleteExpense,
  updateExpense,
};
