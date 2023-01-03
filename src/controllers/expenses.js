'use strict';

const expensesService = require('../services/expenses');
const usersService = require('../services/users');

const getAll = (req, res) => {
  const expenses = expensesService.getAll();
  const { userId, from, to, category } = req.query;

  if (!Object.keys(req.query).length) {
    res.send(expenses);

    return;
  }

  const filteredExpenses = expensesService
    .getFiltered(userId, from, to, category);

  res.send(filteredExpenses);
};

const getOne = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expensesService.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
};

const add = (req, res) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;
  const foundUser = usersService.getById(userId);

  if (!foundUser || (!spentAt || !title || !amount || !category)) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expensesService.create(
    userId,
    spentAt,
    title,
    amount,
    category,
    note
  );

  res.statusCode = 201;

  res.send(newExpense);
};

const remove = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expensesService.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expensesService.remove(expenseId);

  res.sendStatus(204);
};

const update = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expensesService.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  if (!req.body) {
    res.sendStatus(400);

    return;
  }

  expensesService.update(foundExpense, req.body);

  res.send(foundExpense);
};

module.exports = {
  getAll,
  getOne,
  add,
  remove,
  update,
};
