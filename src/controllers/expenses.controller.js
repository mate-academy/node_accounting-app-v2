'use strict';

const expensesService = require('../services/expenses.service');
const usersService = require('../services/users.service');

const get = (req, res) => {
  const { query } = req;
  const expensesFromServer = expensesService.getExpenses();

  if (!Object.keys(query).length) {
    res.send(expensesFromServer);

    return;
  }

  const expensesByQuery = expensesService.getExpenseByQuery(query);

  res.send(expensesByQuery);
};

const getById = (req, res) => {
  const { id } = req.params;
  const expense = expensesService.getExpenseById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.send(expense);
};

const create = (req, res) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  const isUserExist = usersService.getUserById(userId);
  const allValuesExist = userId
    && spentAt
    && title
    && amount
    && category
    && note
    && isUserExist;

  if (!allValuesExist) {
    res.sendStatus(400);

    return;
  }

  const expense = expensesService.createExpense(req.body);

  res.status(201).send(expense);
};

const remove = (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400);

    return;
  }

  const expense = expensesService.getExpenseById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  expensesService.deleteExpense(id);

  res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.params;
  const expense = expensesService.getExpenseById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  const newData = expensesService.updateExpense(expense, req.body);

  newData ? res.send(newData) : res.sendStatus(422);
};

module.exports = {
  get,
  getById,
  create,
  remove,
  update,
};
