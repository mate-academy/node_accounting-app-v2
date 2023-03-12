'use strict';

const expenseService = require('../services/expenses');
const { getBy: getUserBy } = require('../services/users');

const getAll = (req, res) => {
  const expenses = expenseService.getAll();

  res.send(expenses);
};

const get = (req, res) => {
  const { id } = req.params;

  const expense = expenseService.getBy(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.send(expense);
};

const filter = (req, res) => {
  const filteredExpenses = expenseService.filterBy(req.query);

  res.send(filteredExpenses);
};

const create = (req, res) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  if (!userId || !spentAt || !title || !amount || !category || !note) {
    res.sendStatus(400);

    return;
  }

  if (!getUserBy(userId)) {
    res.sendStatus(400);

    return;
  }

  const expenseObj = {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  const newExpense = expenseService.create(expenseObj);

  res.statusCode = 201;
  res.send(newExpense);
};

const remove = (req, res) => {
  const { id } = req.params;
  const expense = expenseService.getBy(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  expenseService.remove(id);
  res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.params;
  const expense = expenseService.getBy(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  const expenseObj = req.body;

  const updatedExpense = expenseService.update({
    id, expenseObj,
  });

  res.send(updatedExpense);
};

module.exports = {
  get,
  getAll,
  filter,
  create,
  remove,
  update,
};
