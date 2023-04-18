'use strict';

const expensesService = require('../services/expenses');
const usersService = require('../services/users');

const getUserExpenses = (req, res) => {
  const expenses = expensesService.getUserExpenses(req.query);

  res.send(expenses);
};

const findById = (req, res) => {
  const expenseId = Number(req.params.expenseId);
  const isExpenseIdValid = !Number.isNaN(expenseId);

  if (!isExpenseIdValid) {
    res.sendStatus(422);

    return;
  }

  const expense = expensesService.findById(expenseId);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.send(expense);
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

  const user = usersService.findById(userId);

  const isAllDataValid = user
  && typeof spentAt === 'string'
  && typeof title === 'string'
  && typeof amount === 'number'
  && typeof note === 'string'
  && typeof category === 'string';

  if (!isAllDataValid) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expensesService.create(req.body);

  res.statusCode = 201;
  res.send(newExpense);
};

const remove = (req, res) => {
  const expenseId = Number(req.params.expenseId);
  const expenseToDelete = expensesService.findById(expenseId);

  if (!expenseToDelete) {
    res.sendStatus(404);

    return;
  }

  expensesService.remove(expenseId);
  res.sendStatus(204);
};

const update = (req, res) => {
  const expenseId = Number(req.params.expenseId);
  const fieldsForUpdate = req.body;
  const expense = expensesService.findById(expenseId);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  const updatedEexpense = expensesService.update(expenseId, fieldsForUpdate);

  res.send(updatedEexpense);
};

module.exports = {
  getUserExpenses,
  findById,
  add,
  remove,
  update,
};
