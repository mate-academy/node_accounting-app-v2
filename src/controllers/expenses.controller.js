'use strict';

const expensesService = require('../services/expenses.service');
const userService = require('../services/users.service');

const get = (req, res) => {
  const allExpenses = expensesService.getAllExpenses();
  const { userId, categories, from, to } = req.query;
  let filteredExpenses = {};

  if (categories && userId) {
    filteredExpenses = allExpenses.filter(item => item.category === categories);

    return res.send(filteredExpenses);
  };

  if (userId) {
    filteredExpenses = allExpenses.filter(
      item => item.userId === Number(userId));

    return res.send(filteredExpenses);
  }

  if (allExpenses.length === 0) {
    return res.send([]);
  }

  if (from && to) {
    filteredExpenses = allExpenses.filter(
      item => item.spentAt > from && item.spentAt < to);

    return res.send(filteredExpenses);
  }

  return res.send(allExpenses);
};

const getOne = (req, res) => {
  const { id } = req.params;

  const item = expensesService.getExpensesById(id);

  if (!item) {
    res.sendStatus(404);

    return;
  }

  res.send(item);
};

const create = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!userService.getUsersById(Number(userId)) || !title) {
    res.sendStatus(400);

    return;
  };

  const item = expensesService.createExpenses(userId,
    spentAt,
    title,
    amount,
    category,
    note);

  res.status(201).json(item);
};

const update = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const expense = expensesService.getExpensesById(Number(id));

  if (!expense) {
    return res.sendStatus(404);
  }

  if (typeof title !== 'string') {
    return res.sendStatus(422);
  }

  const updatedExpenses = expensesService.updateExpenses(title, expense);

  res.send(updatedExpenses);
};

const remove = (req, res) => {
  const { id } = req.params;

  const item = expensesService.getExpensesById(Number(id));

  if (!item) {
    res.sendStatus(404);

    return;
  }

  expensesService.removeExpenses(Number(id));

  return res.sendStatus(204);
};

module.exports = {
  get,
  getOne,
  create,
  update,
  remove,
};
