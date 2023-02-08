'use strict';

const expensesService = require('../services/expenses');
const usersService = require('../services/users');

const getAll = (req, res) => {
  const expenses = expensesService.getAll();

  res.send(expenses);
};

const getById = (req, res) => {
  const { expensesId } = req.params;

  const foundExpense = expensesService.getById(expensesId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
};

const add = (req, res) => {
  const { userId } = req.body;

  const user = usersService.getById(userId);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  const newExpense = expensesService.add(req.body);

  res.send(newExpense);
};

const update = (req, res) => {
  const { expensesId } = req.params;

  const foundExpense = expensesService.getById(expensesId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  if (Object.keys(req.body).includes('userId')) {
    res.sendStatus(400);

    return;
  }

  expensesService.update(foundExpense, req.body);

  res.send(foundExpense);
};

const remove = (req, res) => {
  const { expensesId } = req.params;

  const foundExpense = expensesService.getById(expensesId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expensesService.remove(expensesId);
  res.sendStatus(204);
};

module.exports = {
  getAll, getById, add, update, remove,
};
