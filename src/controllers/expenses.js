'use strict';

const expensesService = require('../services/expenses.js');
const usersService = require('../services/users.js');

const getAllExpenses = (req, res) => {
  const query = req.query;

  const users = expensesService.getAll(query);

  res.send(users);
};

const getExpenseById = (req, res) => {
  const { expenseId } = req.params;

  if (!expenseId) {
    res.sendStatus(400);

    return;
  }

  const foundExpense = expensesService.getById(+expenseId);

  if (!expensesService.getById(+expenseId)) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
};

const createExpense = (req, res) => {
  const newExpense = req.body;

  if (Object.keys(newExpense).length !== 6
    || !usersService.getById(newExpense.userId)) {
    res.sendStatus(400);

    return;
  }

  const createdExpense = expensesService.create(newExpense);

  res.status(201).send(createdExpense);
};

const deleteExpense = (req, res) => {
  const { expenseId } = req.params;

  if (!expenseId) {
    res.sendStatus(400);

    return;
  }

  const expenseForDeleting = expensesService.getById(+expenseId);

  if (!expenseForDeleting) {
    res.sendStatus(404);

    return;
  }

  expensesService.remove(+expenseId);

  res.sendStatus(204);
};

const updateExpense = (req, res) => {
  const { expenseId } = req.params;
  const expenseForUpdate = req.body;

  const foundExpense = expensesService.getById(+expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  if (!Object.keys(expenseForUpdate).length) {
    res.sendStatus(400);

    return;
  }

  expensesService.update(+expenseId, expenseForUpdate);

  res.send(foundExpense);
};

module.exports = {
  getAllExpenses,
  getExpenseById,
  createExpense,
  deleteExpense,
  updateExpense,
};
