'use strict';

const expensesServise = require('../services/expenses');
const usersService = require('../services/users');

const getAll = (req, res) => {
  const query = req.query;
  const url = req.url;

  if (url.includes('from') && url.includes('to')) {
    const expenses = expensesServise.getAll(query, url);

    res.send(expenses);

    return;
  }

  const filteredExpenses = expensesServise.getAll(query);

  res.send(filteredExpenses);
};

const addOne = (req, res) => {
  const params = req.body;
  const { userId } = params;

  const foundUser = usersService.getById(userId);

  if (!foundUser) {
    res.sendStatus(400);

    return;
  }

  if (!params) {
    res.sendStatus(400);

    return;
  }

  const keys = ['userId', 'spentAt', 'title', 'amount', 'category', 'note'];

  for (const key of keys) {
    if (!params.hasOwnProperty(key)) {
      res.sendStatus(404);

      return;
    }
  }

  const newExpenses = expensesServise.addOne(params);

  res.statusCode = 201;
  res.send(newExpenses);
};

const getOne = (req, res) => {
  const { expenseId } = req.params;

  if (!expenseId) {
    res.sendStatus(400);

    return;
  }

  const foundExpense = expensesServise.getOne(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
};

const deleteOne = (req, res) => {
  const { expenseId } = req.params;

  if (!expenseId) {
    res.sendStatus(400);

    return;
  }

  const foundExpense = expensesServise.getOne(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expensesServise.deleteOne(expenseId);

  res.sendStatus(204);
};

const updateOne = (req, res) => {
  const { expenseId } = req.params;
  const newParams = req.body;

  if (!expenseId || !newParams) {
    res.sendStatus(400);

    return;
  }

  const foundExpense = expensesServise.getOne(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expensesServise.updateOne(foundExpense, newParams);

  res.send(foundExpense);
};

module.exports = {
  getAll,
  addOne,
  getOne,
  deleteOne,
  updateOne,
};
