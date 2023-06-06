'use strict';

const expenseService = require('../services/expenses.js');
const userService = require('../services/users.js');

const getAllExpenses = (req, res) => {
  const filteredExpenses = expenseService.getAllfilterExpenses(req.query);

  res.send(filteredExpenses);
};

const getOne = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expenseService.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
};

const add = (req, res) => {
  const data = req.body;

  const userExpense = userService
    .getAll()
    .find(({ id }) => id === data.userId);

  if (!userExpense) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expenseService.create(data);

  res.statusCode = 201;
  res.send(newExpense);
};

const removeExpense = (req, res) => {
  const { expenseId } = req.params;
  const foundUser = expenseService.getById(expenseId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  expenseService.remove(expenseId);
  res.sendStatus(204);
};

const updateExpense = (req, res) => {
  const { expenseId } = req.params;
  const data = req.body;
  const foundExpense = expenseService.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  const updatedExpense = expenseService.update({
    id: expenseId,
    data,
  });

  res.statusCode = 200;
  res.send(updatedExpense);
};

module.exports = {
  getAllExpenses,
  getOne,
  add,
  removeExpense,
  updateExpense,
};
