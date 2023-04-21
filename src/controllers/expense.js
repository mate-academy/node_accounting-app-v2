'use strict';

const expenseService = require('../services/expense');
const userService = require('../services/user');

const getFiltered = (req, res) => {
  const {
    userId,
    categories,
    from,
    to,
  } = req.query;

  const expenses = expenseService.getFiltered(+userId, categories, from, to);

  res.send(expenses);
};

const getById = (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400);

    return;
  }

  const foundExpense = expenseService.getById(+id);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
};

const add = (req, res) => {
  const expense = req.body;
  const { userId } = expense;

  const foundUser = userService.getById(userId);

  if (Object.keys(expense).length < 6 || !foundUser) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expenseService.add(expense);

  res.status(201);
  res.send(newExpense);
};

const remove = (req, res) => {
  const { id } = req.params;
  const foundExpense = expenseService.getById(+id);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expenseService.remove(+id);

  res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.params;
  const expense = req.body;

  const foundExpense = expenseService.getById(+id);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  if (!Object.keys(expense).length) {
    res.sendStatus(400);

    return;
  }

  const updatedExpense = expenseService.update(+id, expense);

  res.send(updatedExpense);
};

module.exports = {
  getFiltered,
  add,
  getById,
  remove,
  update,
};
