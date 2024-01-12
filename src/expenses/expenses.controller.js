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
  res.status(200).send(expenseController.getAll(req.query));
};

const getById = (req, res) => {
  const id = +req.params.id;
  const expense = expenseController.getByID(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.status(200).send(expense);
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

  res.status(201).send(newExpense);
};

const remove = (req, res) => {
  const id = +req.params.id;

  if (!expenseController.getByID(id)) {
    res.sendStatus(404);

    return;
  }

  expenseController.remove(id);

  res.sendStatus(204);
};

const update = (req, res) => {
  const id = +req.params.id;
  const newExpense = req.body;

  if (!expenseController.getByID(id)) {
    res.sendStatus(404);

    return;
  }

  const expense = expenseController.update(id, newExpense);

  res.status(204).send(expense);
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
