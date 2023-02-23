'use strict';

const expensesService = require('../services/expenses');
const usersService = require('../services/users');

const getAll = (req, res) => {
  const expenses = expensesService.getAll(req.query);

  res.send(expenses);
};

const getOne = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expensesService.findById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
};

const add = (req, res) => {
  const {
    userId,
    title,
  } = req.body;

  const foundUser = usersService.findById(userId);

  if (!foundUser) {
    res.sendStatus(400);

    return;
  }

  if (!userId || !title) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expensesService.create(req.body);

  res.sendStatus = 201;
  res.send(newExpense);
};

const remove = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expensesService.findById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expensesService.remove(expenseId);
  res.sendStatus(204);
};

const update = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expensesService.findById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  const { title } = req.body;

  if (typeof title !== 'string') {
    res.sendStatus(400);

    return;
  }

  expensesService.update({
    title,
    id: expenseId,
  });
  res.send(foundExpense);
};

module.exports = {
  getAll,
  getOne,
  add,
  remove,
  update,
};
