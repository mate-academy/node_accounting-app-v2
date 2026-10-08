/* eslint-disable no-console */
const expenseService = require('../services/expenses.service');
const userService = require('../services/users.service');

const REQUIRED_KEYS = ['userId', 'spentAt', 'title', 'amount', 'category'];

const getAll = (req, res) => {
  const expenses = expenseService.getAll(req.query);

  res.status(200).send(expenses);
};

const create = (req, res) => {
  const expense = req.body;

  if (
    !REQUIRED_KEYS.every((key) => key in expense) ||
    !userService.get(expense.userId)
  ) {
    res.sendStatus(400);

    return;
  }

  res.status(201).send(expenseService.create(expense));
};

const get = (req, res) => {
  const { id } = req.params;

  const expenseId = Number(id);

  if (!expenseId) {
    res.sendStatus(400);

    return;
  }

  const targetExpense = expenseService.get(expenseId);

  if (!targetExpense) {
    res.sendStatus(404);

    return;
  }

  res.status(200).send(targetExpense);
};

const update = (req, res) => {
  const { id } = req.params;
  const expenseId = Number(id);

  if (!expenseService.get(expenseId)) {
    res.sendStatus(404);

    return;
  }

  const fieldsToUpdate = req.body;

  const fieldsToUpdateKeys = Object.keys(fieldsToUpdate);

  if (
    !fieldsToUpdateKeys.every((key) => REQUIRED_KEYS.includes(key)) ||
    !fieldsToUpdateKeys.length
  ) {
    res.sendStatus(400);

    return;
  }

  res.status(200).send(expenseService.update(expenseId, fieldsToUpdate));
};

const remove = (req, res) => {
  const { id } = req.params;

  const expenseId = Number(id);

  if (!expenseService.get(expenseId)) {
    res.sendStatus(404);

    return;
  }

  res.status(204).send(expenseService.remove(expenseId));
};

module.exports = {
  getAll,
  create,
  get,
  update,
  remove,
};
