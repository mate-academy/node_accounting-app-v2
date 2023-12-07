'use strict';

const expenseService = require('../services/expenseService');
const userService = require('../services/userService');
const { itemsFilter } = require('../services/itemsFilter');

const getAll = (req, res) => {
  const query = req.query;

  const expenses = expenseService.getAll();

  if (!Object.keys(query).length) {
    res.send(expenses);

    return;
  }

  const filteredExpenses = itemsFilter(expenses, query);

  res.send(filteredExpenses);
};

const getOne = (req, res) => {
  const { id } = req.params;

  const expense = expenseService.getById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }
  res.send(expense);
};

const create = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  const user = userService.getById(userId);

  if (title === undefined || amount === undefined || category === undefined
    || !user) {
    res.sendStatus(400);

    return;
  }

  const expense = expenseService.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note: note || '',
  });

  res.statusCode = 201;

  res.send(expense);
};

const remove = (req, res) => {
  const { id } = req.params;

  if (!expenseService.getById(id)) {
    res.sendStatus(404);

    return;
  }

  expenseService.remove(id);

  res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.params;
  const params = req.body;
  const expense = expenseService.getById(Number(id));

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  const updatedExpense = expenseService.update(id, params);

  res.send(updatedExpense);
};

module.exports = {
  getAll,
  getOne,
  create,
  remove,
  update,
};
