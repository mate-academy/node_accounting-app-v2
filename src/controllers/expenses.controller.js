'use strict';

const expensesService = require('../services/expenses.service');
const userService = require('../services/user.service');
const { statusCode } = require('../statusCodes');

const get = (req, res) => {
  const { userId, from, to, categories } = req.query;

  const filteredExpenses = expensesService.getExpenses(
    userId,
    from,
    to,
    categories
  );

  res.send(filteredExpenses);
};

const getOne = (req, res) => {
  const { id } = req.params || undefined;
  const userExpens = expensesService.getExpensesById(id);

  if (!userExpens) {
    res.status(statusCode.NOT_FOUND).send();
  } else {
    res.send(userExpens);
  }
};

const create = (req, res) => {
  const newExpense = req.body;

  if (typeof newExpense.title !== 'string') {
    res.status(statusCode.BAD_REQUEST);
    res.send();

    return;
  }

  if (!userService.getUserById(newExpense.userId)) {
    res.status(statusCode.BAD_REQUEST);
    res.send();

    return;
  }

  const expens = expensesService.createExpense(newExpense);

  res.status(statusCode.CREATED);
  res.send(expens);
};

const update = (req, res) => {
  const { id } = req.params || undefined;
  const updateExpense = req.body || undefined;

  if (!expensesService.getExpensesById(id)) {
    res.status(statusCode.NOT_FOUND);
    res.send();

    return;
  }

  const changedExpens = expensesService.changeExpense(id, updateExpense);

  res.status(statusCode.OK);
  res.send(changedExpens);
};

const remove = (req, res) => {
  const { id } = req.params || undefined;

  if (expensesService.getExpensesById(id)) {
    expensesService.deleteExpense(id);
    res.status(statusCode.NO_CONTENT).send();
  } else {
    res.status(statusCode.NOT_FOUND).send();
  }
};

module.exports = {
  get,
  getOne,
  create,
  update,
  remove,
};
