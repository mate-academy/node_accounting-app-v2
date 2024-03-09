'use strict';

const expenseServices = require('../services/expense.services');
const userServices = require('../services/user.service');

const getAll = (req, res) => {
  const { userId, categories, from, to } = req.query;

  res.statusCode = 200;

  res.send(expenseServices.getAll({
    userId, categories, from, to,
  }));
};

const get = (req, res) => {
  const { id } = req.params;

  const choosedExpense = expenseServices.getById(id);

  if (!choosedExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(choosedExpense);
};

const create = (req, res) => {
  const data = req.body;

  if (!userServices.getById(data.userId)) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expenseServices.create(data);

  res.status(201).send(newExpense);
};

const remove = (req, res) => {
  const { id } = req.params;

  if (!expenseServices.getById(id)) {
    res.sendStatus(404);

    return;
  }

  expenseServices.remove(id);

  res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const choosedExpense = expenseServices.getById(id);

  if (!choosedExpense) {
    res.sendStatus(404);

    return;
  }

  const updatedExpense = expenseServices.update(choosedExpense, data);

  res.send(updatedExpense);
};

module.exports = {
  get,
  getAll,
  create,
  remove,
  update,
};
