'use strict';

const expenceServices = require('../services/expenses');
const userServices = require('../services/users');

const getAll = (req, res) => {
  const { userId, categories, from, to } = req.query;

  const expenses = expenceServices.getAll(userId, categories, from, to);

  res.status(200).send(expenses);
};

const getOne = (req, res) => {
  const { expensesId } = req.params;

  if (!expensesId) {
    res.sendStatus(400);

    return;
  }

  const foundExpense = expenceServices.getById(expensesId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.status(200).send(foundExpense);
};

const create = (req, res) => {
  const data = req.body;
  const users = userServices.getAll();
  const userExpense = users.find(user => user.id === Number(data.userId));

  if (!Object.entries(data).length || !userExpense) {
    res.sendStatus(400);

    return;
  }

  const newExpence = expenceServices.createExpence(data);

  res.status(201).send(newExpence);
};

const remove = (req, res) => {
  const { expensesId } = req.params;

  if (!expensesId) {
    res.sendStatus(400);

    return;
  }

  const expense = expenceServices.getById(expensesId);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  expenceServices.removeExpence(expensesId);

  return res.sendStatus(204);
};

const update = (req, res) => {
  const { expensesId } = req.params;
  const body = req.body;

  if (!expensesId) {
    res.sendStatus(400);

    return;
  }

  const foundExpense = expenceServices.getById(expensesId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  const updateExpense = expenceServices.updateById(expensesId, body);

  res.status(200).send(updateExpense);
};

module.exports = {
  getAll,
  getOne,
  create,
  remove,
  update,
};
