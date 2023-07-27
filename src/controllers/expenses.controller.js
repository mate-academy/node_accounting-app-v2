'use strict';

const expensesService = require('../services/expenses.service.js');
const userService = require('../services/users.service.js');

const getAll = (req, res) => {
  const {
    userId,
    from,
    to,
    categories,
  } = req.query;

  const expenses = expensesService.getAllByFilter({
    userId,
    from,
    to,
    categories,
  });

  res.send(expenses);
};

const getOne = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expensesService.getById(expenseId);

  if (!foundExpense) {
    res.status(404).json({ error: 'Expense not found' });

    return;
  }

  res.send(foundExpense);
};

const add = (req, res) => {
  const body = req.body;

  const {
    userId,
    title,
  } = req.body;

  const foundUser = userService.getById(userId);

  if (!foundUser) {
    res.status(400).json({ error: 'User not found' });

    return;
  }

  if (!userId || !title) {
    res.status(422).json({
      error: 'Both "userId" and "title" fields are required',
    });

    return;
  }

  const newExpense = expensesService.create(body);

  res.statusCode = 201;
  res.send(newExpense);
};

const remove = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expensesService.getById(expenseId);

  if (!foundExpense) {
    res.status(404).json({ error: 'Expense not found' });

    return;
  }

  expensesService.remove(expenseId);

  res.sendStatus(204);
};

const update = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expensesService.getById(expenseId);

  if (!foundExpense) {
    res.status(404).json({ error: 'Expense not found' });

    return;
  }

  expensesService.update({
    id: expenseId, ...req.body,
  });

  res.send(foundExpense);
};

module.exports = {
  getAll, getOne, add, remove, update,
};
