/* eslint-disable no-console */
'use strict';

const expenseService = require('../services/expense.service');
const userService = require('../services/user.service');

const get = (req, res) => {
  const {
    userId,
    categories,
    from,
    to,
  } = req.query;

  let filteredExpenses = expenseService.getAll();

  if (userId) {
    filteredExpenses = expenseService.getAllByUserId(+userId, filteredExpenses);
  }

  if (categories) {
    filteredExpenses = expenseService
      .getAllByCategory(categories, filteredExpenses);
  }

  if (from) {
    filteredExpenses = expenseService.getAllByDateFrom(from, filteredExpenses);
  }

  if (to) {
    filteredExpenses = expenseService.getAllByDateTo(to, filteredExpenses);
  }

  res.statusCode = 200;
  res.send(filteredExpenses);
};

const getOne = (req, res) => {
  const expenseId = +req.url.slice(1);

  const expense = expenseService.getById(expenseId);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  const user = userService.getById(expense.userId);

  if (!user && !expense.userId) {
    res.sendStatus(400);

    return;
  }

  res.statusCode = 200;
  res.send(expense);
};

const update = (req, res) => {
  const expenseId = +req.url.slice(1);
  const body = req.body;

  const expense = expenseService.getById(expenseId);

  if (!expense || !body) {
    res.sendStatus(404);

    return;
  }

  const user = userService.getById(expense.userId);

  if (!user) {
    res.sendStatus(400);

    return;
  }

  const updatedExpense = expenseService.update(
    expenseId,
    body,
  );

  res.statusCode = 200;
  res.send(updatedExpense);
};

const create = (req, res) => {
  const { title, amount, category, note, userId, spentAt } = req.body;

  if (!title || !amount || !category || !userId) {
    res.sendStatus(400);

    return;
  }

  if (!userService.getById(+userId)) {
    res.sendStatus(400);

    return;
  }

  const expense = expenseService.create({
    title,
    amount,
    category,
    note,
    userId,
    spentAt,
  });

  res.statusCode = 201;
  res.send(expense);
};

const remove = (req, res) => {
  const expenseId = req.url.slice(1);

  if (!expenseService.getById(+expenseId)) {
    res.sendStatus(404);

    return;
  }

  expenseService.deleteExpense(+expenseId);

  res.sendStatus(204);
};

module.exports = {
  update,
  get,
  getOne,
  create,
  remove,
};
