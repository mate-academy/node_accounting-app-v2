'use strict';

const expenseServices = require('../services/expenses');
const userServices = require('../services/users');

const getAll = (req, res) => {
  const body = req.query;
  const expenses = expenseServices.getAll(body);

  res.send(expenses);
};

const getOne = (req, res) => {
  const { expensesId } = req.params;

  if (!expensesId) {
    res.sendStatus(400);

    return;
  }

  const foundExpense = expenseServices.getById(expensesId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
};

const create = (req, res) => {
  const {
    userId,
    spentAt,
    title,
  } = req.body;

  const users = userServices.getAll();
  const allUsersId = users.map(({ id }) => id);
  const hasUser = allUsersId.includes(+userId);
  const hasAllData = Number.isInteger(+userId) && title && spentAt;

  if (!hasUser || !hasAllData) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expenseServices.create(req.body);

  res.status(201).send(newExpense);
};

const remove = (req, res) => {
  const { expensesId } = req.params;

  if (!expensesId) {
    res.sendStatus(400);

    return;
  }

  const filteredExpenses = expenseServices.remove(expensesId);

  if (!filteredExpenses) {
    res.sendStatus(404);

    return;
  }

  res.status(204).send();
};

const update = (req, res) => {
  const { expensesId } = req.params;
  const body = req.body;

  if (!expensesId) {
    res.sendStatus(400);

    return;
  }

  const foundExpense = expenseServices.update(expensesId, body);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.status(200).send(foundExpense);
};

module.exports = {
  getAll,
  getOne,
  create,
  remove,
  update,
};
