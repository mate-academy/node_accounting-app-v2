'use strict';

const expenseService = require('../services/expenses');
const userService = require('../services/users');

const getAllExpenses = (req, res) => {
  const expenses = expenseService.getAll(req.query);

  res.send(expenses);
};

const createExpense = (req, res) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  const userIds = userService.getAll()
    .map(user => user.id);

  if (!userIds.includes(+userId)) {
    res.sendStatus(400);

    return;
  }

  if (userId === undefined || amount === undefined) {
    res.sendStatus(400);

    return;
  }

  if (!spentAt || !title || !category || !note) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expenseService.create(
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  );

  res.status(201);
  res.send(newExpense);
};

const getExpenseById = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expenseService.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
};

const removeExpense = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expenseService.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expenseService.remove(expenseId);
  res.sendStatus(204);
};

const updateExpense = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expenseService.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expenseService.update(expenseId, req.body);

  res.send(foundExpense);
};

module.exports = ({
  getAllExpenses,
  createExpense,
  getExpenseById,
  removeExpense,
  updateExpense,
});
