'use strict';

const userService = require('../services/user.services');
const expenseService = require('../services/expense.services');

const getAllExpenses = (req, res) => {
  const expenses = expenseService.getAll(req.query);

  res.send(expenses);
};

const createExpense = (req, res) => {
  const { userId, spentAt, title, amount, category } = req.body;

  if (
    !userService.getById(userId) ||
    !spentAt ||
    !title ||
    !amount ||
    !category
  ) {
    return res
      .status(400)
      .send({ error: 'Missing required fields or invalid user.' });
  }

  const newExpense = expenseService.create(req.body);

  res.status(201).send(newExpense);
};

const getExpenseById = (req, res) => {
  const { id } = req.params;

  const expense = expenseService.getById(id);

  if (!expense) {
    return res.status(404).send({ error: 'Expense not found.' });
  }

  res.send(expense);
};

const updateExpenseById = (req, res) => {
  const { id } = req.params;

  const expense = expenseService.getById(id);

  if (!expense) {
    return res.status(404).send({ error: 'Expense not found.' });
  }

  const updatedExpense = expenseService.updateById(id, req.body);

  res.send(updatedExpense);
};

const removeExpenseById = (req, res) => {
  const { id } = req.params;

  const expense = expenseService.getById(id);

  if (!expense) {
    return res.status(404).send({ error: 'Expense not found.' });
  }

  expenseService.removeById(id);
  res.sendStatus(204);
};

module.exports = {
  createExpense,
  getAllExpenses,
  getExpenseById,
  updateExpenseById,
  removeExpenseById,
};
