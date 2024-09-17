'use strict';

const expensesService = require('../services/expenses');
const usersService = require('../services/users');

const create = (req, res) => {
  const { title, userId } = req.body;
  const foundUser = usersService.getById(userId);

  if (!title || !foundUser) {
    res.sendStatus(400);

    return;
  }

  const expense = expensesService.create(req.body);

  res.statusCode = 201;
  res.send(expense);
};

const getAll = (req, res) => {
  const { userId, categories, from, to } = req.query;
  let expenses = expensesService.getAll();

  if (userId) {
    expenses = expenses.filter(expense => expense.userId === +userId);
  }

  if (categories) {
    expenses = expenses.filter(expense => (
      categories.includes(expense.category)
    ));
  }

  if (from) {
    expenses = expenses.filter(expense => (
      new Date(expense.spentAt) >= new Date(from)
    ));
  }

  if (to) {
    expenses = expenses.filter(expense => (
      new Date(expense.spentAt) <= new Date(to)
    ));
  }

  res.send(expenses);
};

const getById = (req, res) => {
  const foundExpense = expensesService.getById(req.params.expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
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

  const updatedExpense = expensesService.update(expenseId, req.body);

  res.send(updatedExpense);
};

module.exports = {
  create,
  getAll,
  getById,
  remove,
  update,
};
