'use strict';

const expenseServices = require('../services/expenses');
const usersServices = require('../services/users');

const getAll = (req, res) => {
  const expenses = expenseServices.getAll(req.query);

  res.send(expenses);
};

const getOne = (req, res) => {
  const { expenseId } = req.params;
  const expense = expenseServices.getById(expenseId);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.send(expense);
};

const create = (req, res) => {
  const {
    userId,
    title,
    amount,
    category,
    spentAt,
    note,
  } = req.body;

  const requiredFields = ['userId', 'spentAt', 'title', 'amount', 'category'];

  const requestFields = Object.keys(req.body);

  const hasRequiredFields
    = requiredFields.every(field => requestFields.includes(field));

  const user = usersServices.getById(userId);

  if (!user || !hasRequiredFields || !requestFields.length) {
    res.sendStatus(400);

    return;
  }

  if (
    typeof userId !== 'number'
    || typeof amount !== 'number'
    || typeof title !== 'string'
    || typeof note !== 'string'
    || typeof category !== 'string'
    || isNaN(Date.parse(spentAt))
  ) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expenseServices.create(req.body);

  res.status(201);
  res.send(newExpense);
};

const update = (req, res) => {
  const { expenseId } = req.params;

  const expense = expenseServices.getById(expenseId);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  expenseServices.update(expenseId, { ...req.body });

  res.send(expense);
};

const remove = (req, res) => {
  const { expenseId } = req.params;

  const expense = expenseServices.getById(expenseId);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  expenseServices.remove(expenseId);
  res.sendStatus(204);
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
};
