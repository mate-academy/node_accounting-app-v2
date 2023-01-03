'use strict';

const expensesService = require('../services/expenses');
const { getById: getUserById } = require('../services/users');

const getAll = (req, res) => {
  const { userId, category, from, to } = req.query;
  const expanses = expensesService.getAll(userId, category, from, to);

  res.send(expanses);
};

const getOne = (req, res) => {
  const { expenseId } = req.params;

  const foundExpense = expensesService.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  };

  res.send(foundExpense);
};

const create = (req, res) => {
  const newExpense = req.body;
  const { userId, title } = newExpense;
  const foundUser = getUserById(userId);

  if (!title || !foundUser) {
    res.sendStatus(400);

    return;
  };

  expensesService.addOne(newExpense);

  res.statusCode = 201;
  res.send(newExpense);
};

const remove = (req, res) => {
  const { expenseId } = req.params;

  const foundExpense = expensesService.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  };

  expensesService.deleteOne(expenseId);
  res.sendStatus(204);
};

const update = (req, res) => {
  const { expenseId } = req.params;
  const newData = req.body;

  if (!expenseId) {
    res.sendStatus(400);

    return;
  };

  const foundExpense = expensesService.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  };

  const updatedExpense = expensesService.updateOne(foundExpense, newData);

  res.send(updatedExpense);
};

module.exports = {
  getAll,
  getOne,
  create,
  remove,
  update,
};
