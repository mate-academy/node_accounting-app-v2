'use strict';

const expService = require('../services/expenses.serice');

const expensesKeys = [
  'userId',
  'spentAt',
  'title',
  'amount',
  'category',
];

const checkKeys = (expense) => expensesKeys
  .every(item => expense.hasOwnProperty(item));

const getAll = (req, res) => {
  res.status(200).send(expService.getAll(req.query));
};

const getOne = (req, res) => {
  const exp = expService.getById(+req.params.id);

  if (!exp) {
    res.status(404).send('exp not found');

    return;
  }

  return res.status(200).send(exp);
};

const create = (req, res) => {
  const exp = req.body;

  if (!checkKeys(exp)) {
    res.status(404);

    return;
  }

  return res.status(201).send(expService.create(exp));
};

const remove = (req, res) => {
  if (!expService.getById(+req.params.id)) {
    res.status(404);

    return;
  }

  expService.remove(+req.params.id);

  return res.status(204).send('delete');
};

const update = (req, res) => {
  const id = +req.params.id;
  const newExpense = req.body;

  if (!expService.getById(id)) {
    res.sendStatus(404);

    return;
  }

  const expense = expService.update(id, newExpense);

  res.status(204).send(expense);
};

module.exports = {
  remove,
  update,
  create,
  getOne,
  getAll,
};
