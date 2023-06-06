'use strict';

const expenceServices = require('../services/expences');
const userServices = require('../services/users');

const getAll = (req, res) => {
  const { userId, categories, from, to } = req.query;

  const expenses = expenceServices.getAll(userId, categories, from, to);

  res.send(expenses);
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

  res.send(foundExpense);
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

  res.statusCode = 201;
  res.send(newExpence);
};

const remove = (req, res) => {
  const { expensesId } = req.params;

  if (!expensesId) {
    res.sendStatus(400);

    return;
  }

  const filteredExpenses = expenceServices.removeExpence(expensesId);

  if (!filteredExpenses) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 204;
  res.send();
};

const update = (req, res) => {
  const { expensesId } = req.params;
  const body = req.body;

  if (!expensesId) {
    res.sendStatus(400);

    return;
  }

  const foundExpense = expenceServices.updateById(expensesId, body);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
  res.send(foundExpense);
};

module.exports = {
  getAll,
  getOne,
  create,
  remove,
  update,
};
