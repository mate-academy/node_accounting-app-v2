/* eslint-disable object-curly-newline */
'use strict';

const expensesService = require('../services/expenses.js');
const usersService = require('../services/users.js');

const getAll = (req, res) => {
  let expenses = expensesService.getAll();

  const userId = req.query.userId;
  const category = req.query.categories;
  const from = req.query.from;
  const to = req.query.to;

  if (userId) {
    expenses = expenses.filter(expense => expense.userId === +userId);
  }

  if (category) {
    expenses = expenses.filter(expense => expense.category === category);
  }

  if (from && to) {
    expenses = expenses
      .filter(expense => expense.spentAt >= from && expense.spentAt <= to);
  }

  res.send(expenses);
};

const getOne = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expensesService.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
};

const add = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!title || typeof title !== 'string') {
    res.sendStatus(400);

    return;
  }

  if (!spentAt || typeof spentAt !== 'string') {
    res.sendStatus(400);

    return;
  }

  if (!amount || typeof amount !== 'number') {
    res.sendStatus(400);

    return;
  }

  if (!category || typeof category !== 'string') {
    res.sendStatus(400);

    return;
  }

  if (!note || typeof note !== 'string') {
    res.sendStatus(400);

    return;
  }

  if (!usersService.getById(userId)) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expensesService.create(
    userId, spentAt, title, amount, category, note
  );

  res.statusCode = 201;
  res.send(newExpense);
};

const remove = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expensesService.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expensesService.remove(expenseId);
  res.sendStatus(204);
};

const update = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expensesService.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  const { spentAt, title, amount, category, note } = req.body;
  const updatedFields = {};

  if (req.body.hasOwnProperty('spentAt')) {
    if (typeof spentAt !== 'string') {
      res.sendStatus(422);

      return;
    }
    updatedFields.spentAt = spentAt;
  }

  if (req.body.hasOwnProperty('title')) {
    if (typeof title !== 'string') {
      res.sendStatus(422);

      return;
    }

    updatedFields.title = title;
  }

  if (req.body.hasOwnProperty('amount')) {
    if (typeof amount !== 'number') {
      res.sendStatus(422);

      return;
    }
    updatedFields.amount = amount;
  }

  if (req.body.hasOwnProperty('category')) {
    if (typeof category !== 'string') {
      res.sendStatus(422);

      return;
    }

    updatedFields.category = category;
  }

  if (req.body.hasOwnProperty('note')) {
    if (typeof note !== 'string') {
      res.sendStatus(422);

      return;
    }
    updatedFields.note = note;
  }

  expensesService.update({
    id: expenseId, ...updatedFields,
  });

  res.send(foundExpense);
};

module.exports = {
  getAll, getOne, add, remove, update,
};
