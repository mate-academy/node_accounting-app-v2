'use strict';

const expenseController = require('./expenses.services');
const userController = require('../users/users.services');

const expenseKeys = [
  'userId',
  'spentAt',
  'title',
  'amount',
  'category',
];

const checkProps = (expense) => expenseKeys
  .every(prop => expense.hasOwnProperty(prop));

const getAll = (req, res) => {
  res.send(expenseController.getAll(req.query));
};

const getById = (req, res) => {
  const { id } = req.params;
  const expense = expenseController.getByID(+id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.send(expense);
};

const create = (req, res) => {
  const expense = req.body;

  if (!checkProps(expense)) {
    res.sendStatus(400);

    return;
  }

  if (!userController.getByID(expense.userId)) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expenseController.create(expense);

  res.status(201);
  res.send(newExpense);
};

const remove = (req, res) => {
  const { id } = req.params;

  if (!expenseController.getByID(+id)) {
    res.sendStatus(404);

    return;
  }

  expenseController.remove(+id);

  res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.params;
  const newExpense = req.body;

  if (!expenseController.getByID(+id)) {
    res.sendStatus(404);

    return;
  }

  const expense = expenseController.update(+id, newExpense);

  res.send(expense);
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
