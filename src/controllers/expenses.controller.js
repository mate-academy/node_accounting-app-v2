'use strict';

const expensesService = require('../services/expenses.service');
const userService = require('../services/users.service');

const getAllExpenses = (req, res) => {
  const expenses = expensesService.getAll(req.query);

  res.json(expenses);
};

const getOneExpense = (req, res) => {
  const { id } = req.params;

  const expense = expensesService.getById(+id);

  if (!expense) {
    res.statusCode = 404;
    res.statusMessage = 'Error';
    res.end();
  }
  res.json(expense);
};

const createExpense = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;
  const user = userService.getById(userId);

  if (!user || !spentAt || !title || !amount || !category || !note || !userId) {
    res.statusCode = 400;
    res.statusMessage = 'Error';
    res.end();
  }

  const newExpense = expensesService.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.statusCode = 201;
  res.json(newExpense);
  res.end();
};

const updateExpense = (req, res) => {
  const { id } = req.params;
  const data = req.body;

  const expense = expensesService.getById(+id);

  if (!expense) {
    res.statusCode = 404;
    res.statusMessage = 'Error';
    res.end();
  }

  const updatedExpense = expensesService.update(id, data);

  res.json(updatedExpense);
};

const removeExpense = (req, res) => {
  const { id } = req.params;

  const expense = expensesService.getById(+id);

  if (!expense) {
    return res.sendStatus(404);
  }

  expensesService.remove(+id);
  res.sendStatus(204);
};

module.exports = {
  getAllExpenses,
  getOneExpense,
  createExpense,
  updateExpense,
  removeExpense,
};
