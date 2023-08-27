'use strict';

const expenseService = require('../services/expenses.js');
const userService = require('../services/users.js');

const getOne = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expenseService.getById(expenseId);

  if (!foundExpense) {
    res.status(404).send('Not Found');

    return;
  }

  res.send(foundExpense);
};

const getAll = (req, res) => {
  const query = req.query;
  const expenses = expenseService.getAll(query);

  res.send(expenses);
};

const add = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!userId
    || !spentAt
    || !title
    || !amount
    || !category
    || !note
  ) {
    res.statusCode = 400;
    res.send('Pass all required fields');

    return;
  }

  const foundUserById = userService.getById(userId);

  if (!foundUserById) {
    res.statusCode = 400;
    res.send('User is not found');

    return;
  }

  const newExpense = expenseService.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.statusCode = 201;
  res.send(newExpense);
};

const remove = (req, res) => {
  const { expenseId } = req.params;
  const foundExpenseById = expenseService.getById(expenseId);

  if (!foundExpenseById) {
    res.statusCode = 404;
    res.send('Not Found');

    return;
  }

  expenseService.remove(expenseId);

  res.status(204).send();
};

const updateExpense = (req, res) => {
  const { expenseId } = req.params;
  const foundExpenseById = expenseService.getById(expenseId);

  if (!foundExpenseById) {
    res.statusCode = 404;
    res.send('Expense is not found');

    return;
  }

  const { body } = req;

  const updatedExpense = expenseService.update(expenseId, body);

  res.statusCode = 200;
  res.send(updatedExpense);
};

module.exports = {
  getAll,
  getOne,
  add,
  updateExpense,
  remove,
};
