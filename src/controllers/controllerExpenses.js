'use strict';

const expenseService = require('../services/servicesExpenses.js');
const userService = require('../services/servicesUsers.js');

const getAll = (req, res) => {
  const expenses = expenseService.getAll(req.query);

  res.send(expenses);
};

const getOne = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expenseService.getById(expenseId);

  if (!foundExpense) {
    res.statusCode = 404;
    res.send('Expense not found');

    return;
  }

  res.send(foundExpense);
};

const add = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!userId || !spentAt || !title || !amount || !category || !note) {
    res.sendStatus(400);
    res.send('Pass all fields');

    return;
  }

  const foundUser = userService.getById(userId);

  if (!foundUser) {
    res.sendStatus(400);
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
  const foundExpense = expenseService.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);
    res.send('Expeense Not Found');

    return;
  }

  expenseService.remove(expenseId);

  res.status(204).send();
};

const update = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expenseService.getById(expenseId);

  if (!foundExpense) {
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
  getAll, getOne, add, remove, update,
};
