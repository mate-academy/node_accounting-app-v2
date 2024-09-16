'use strict';

const expensesService = require('../services/expenses');
const usersService = require('../services/users');

const getAll = (req, res) => {
  const queryParams = req.query;

  const filteredExpenses = expensesService.getAll(queryParams);

  res.send(filteredExpenses);
};

const getAOne = (req, res) => {
  const { id } = req.params;

  if (isNaN(id)) {
    res.sendStatus(400);

    return;
  }

  const foundExpense = expensesService.getById(+id);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
};

const create = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!userId || !spentAt || !title || !amount || !category) {
    res.sendStatus(400);

    return;
  }

  const foundUser = usersService.getById(+userId);

  if (!foundUser) {
    res.sendStatus(400);

    return;
  }

  const newExpenses = expensesService
    .create(userId, spentAt, title, amount, category, note);

  res.statusCode = 201;
  res.send(newExpenses);
};

const remove = (req, res) => {
  const { id } = req.params;

  const foundExpenses = expensesService.getById(+id);

  if (!foundExpenses) {
    res.sendStatus(404);

    return;
  }

  expensesService.remove(+id);

  res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.params;
  const bodyParams = req.body;

  const foundExpenses = expensesService.getById(+id);

  if (!foundExpenses) {
    res.sendStatus(404);

    return;
  }

  if (Object.keys(bodyParams).length === 0) {
    res.sendStatus(400);

    return;
  }

  const updatedExpenses = expensesService.update(bodyParams, foundExpenses);

  res.send(updatedExpenses);
};

module.exports = {
  create,
  remove,
  getAll,
  getAOne,
  update,
};
