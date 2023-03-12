'use strict';

const { expensesService } = require('../services/expenses');
const { usersService } = require('../services/users');

const getAll = (req, res, next) => {
  const expenses = expensesService.getAll();

  if (!Object.keys(req.query)) {
    res.send(expenses);

    return;
  }

  next();
};

const getAllFilteredExpenses = (req, res) => {
  const filters = req.query;

  const expensesToShow = expensesService
    .getAllFilteredExpenses(filters);

  res.send(expensesToShow);
};

const getById = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expensesService.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  if (isNaN(+expenseId)) {
    res.sendStatus(400);

    return;
  }

  res.send(foundExpense);
};

const add = (req, res) => {
  const { userId } = req.body;
  const foundUser = usersService.getById(userId);

  if (!foundUser || Object.keys(req.body) < 6) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expensesService.add(req.body);

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

  Object.assign(foundExpense, { ...req.body });

  res.send(foundExpense);
};

module.exports.expensesController = {
  getAll,
  getAllFilteredExpenses,
  getById,
  add,
  remove,
  update,
};
