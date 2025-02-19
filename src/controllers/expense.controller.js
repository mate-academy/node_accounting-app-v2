'use strict';

const expenseService = require('../services/expense.services');
const userService = require('../services/user.services');

const getAll = (req, res) => {
  const expenses = expenseService.getAll(req.query);

  res.statusCode = 200;
  res.send(expenses);
};

const getOne = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.sendStatus(400);
  }

  const expense = expenseService.getById(id);

  if (!expense) {
    return res.sendStatus(404);
  }

  res.statusCode = 200;
  res.send(expense);
};

const create = (req, res) => {
  const { userId, spentAt, title, amount, category } = req.body;

  const user = userService.getById(userId);

  if (
    !user ||
    !spentAt ||
    typeof spentAt !== 'string' ||
    !title ||
    typeof title !== 'string' ||
    !amount ||
    typeof amount !== 'number' ||
    !category ||
    typeof category !== 'string'
  ) {
    return res.sendStatus(400);
  }

  const newExpense = expenseService.create(req.body);

  res.statusCode = 201;
  res.send(newExpense);
};

const update = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.sendStatus(400);
  }

  const expense = expenseService.getById(id);

  if (!expense) {
    return res.sendStatus(404);
  }

  const updatedExpense = expenseService.update(id, req.body);

  res.statusCode = 200;
  res.send(updatedExpense);
};

const remove = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.sendStatus(400);
  }

  const expense = expenseService.getById(id);

  if (!expense) {
    return res.sendStatus(404);
  }

  expenseService.remove(id);
  res.sendStatus(204);
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
};
