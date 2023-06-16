'use strict';

const expenseServices = require('../services/expenses');
const userServices = require('../services/users');

const getAll = (req, res) => {
  const body = req.body;
  const expenses = expenseServices.getAll(body);

  res.send(expenses);
  // const { expenseId } = req.params;

  // const foundExpense = expenseServices.getById(expenseId);

  // if (!foundExpense) {
  //   res.sendStatus(404);

  //   return;
  // }

  // res.send(foundExpense);
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
  const hasUser = allUsersId.includes(userId);
  const hasAllData = userId && title && spentAt;

  if (!hasUser || !hasAllData) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expenseServices.create(req.body);

  res.statusCode = 201;
  res.send(newExpense);
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

  const foundExpense = expenseServices.update(expensesId, body);

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
