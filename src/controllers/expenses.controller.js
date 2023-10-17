'use strict';

const expensesService = require('../services/expenses.service');
const { getUserById } = require('../services/user.service');

const get = (req, res) => {
  const normalizedURL = new URL(req.url, 'http://localehost:3000/');

  if (normalizedURL.searchParams) {
    res.send(expensesService.getExpenses(normalizedURL.searchParams));
  } else {
    res.send(expensesService.getAllExpenses());
  }
};

const getOne = (req, res) => {
  const { id } = req.params;

  const expense = expensesService.getExpenseById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.send(expense);
};

const update = (req, res) => {
  const { id } = req.params;
  const itemToUpdate = req.body;

  const expense = expensesService.getExpenseById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  const updatedExpense = expensesService.updateExpense(id, itemToUpdate);

  res.send(updatedExpense);
};

const remove = (req, res) => {
  const { id } = req.params;

  if (!expensesService.getExpenseById(id)) {
    res.sendStatus(404);

    return;
  }

  expensesService.removeExpense(id);

  res.sendStatus(204);
};

const create = (req, res) => {
  const { userId,
    spentAt,
    title,
    amount,
    category,
    note } = req.body;

  if (!userId || !spentAt || !title || !amount || !category || !note) {
    res.sendStatus(400);

    return;
  }

  if (!getUserById(userId)) {
    res.sendStatus(400);

    return;
  }

  const expense = expensesService.createExpense(
    userId,
    spentAt,
    title,
    amount,
    category,
    note);

  res.status(201);
  res.send(expense);
};

module.exports = {
  get,
  getOne,
  update,
  remove,
  create,
};
