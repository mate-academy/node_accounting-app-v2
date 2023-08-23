'use strict';

const expenseService = require('../services/expenses.js');
const userService = require('../services/users.js');

const getAllExpenses = (req, res) => {
  const { userId, categories, from, to } = req.query;

  const filtredExpenses = expenseService.getAllByQuery(
    userId,
    categories,
    from,
    to,
  );

  res.send(filtredExpenses);
};

const getOneExpense = (req, res) => {
  const expenseId = parseInt(req.params.expenseId);
  const foundExpense = expenseService.findExpenseById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);
  }

  res.send(foundExpense);
};

const addExpense = (req, res) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  if (!userService.getUserById(userId) || !title) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expenseService.createExpense(
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  );

  res.status(201).json(newExpense);
  res.send();
};

const updateExpense = (req, res) => {
  const expenseId = parseInt(req.params.expenseId);
  const foundExpenses = expenseService.findExpenseById(expenseId);

  if (!foundExpenses) {
    res.sendStatus(404);

    return;
  }

  const fieldNames = [ 'userId',
    'spentAt',
    'title',
    'amount',
    'category',
    'note'];

  const update = {};

  for (const name of fieldNames) {
    if (req.body.hasOwnProperty(name)) {
      update[name] = req.body[name];
    }
  };

  Object.assign(foundExpenses, update);
  res.send(foundExpenses);
};

const removeExpense = (req, res) => {
  const expenseId = parseInt(req.params.expenseId);
  const foundExpenses = expenseService.findExpenseById(expenseId);

  if (!foundExpenses) {
    res.sendStatus(404);

    return;
  }

  expenseService.deleteExpense(expenseId);
  res.sendStatus(204);
};

module.exports = {
  getAllExpenses,
  getOneExpense,
  addExpense,
  updateExpense,
  removeExpense,
};
