'use strict';

const userServices = require('../services/users.js');
const expensesServices = require('../services/expenses.js');

const getAll = (req, res) => {
  const filteredExpenses = expensesServices.getFilteredExpenses(req.query);

  res.send(filteredExpenses);
};

const getExpense = (req, res) => {
  const { expenseId } = req.params;

  const foundExpense = expensesServices.getById(expenseId);

  if (!foundExpense) {
    return res.sendStatus(404);
  }

  res.statusCode = 200;
  res.send(foundExpense);
};

const addExpense = (req, res) => {
  const { title, amount, spentAt, category, userId, note } = req.body;

  const userFound = userServices.getById(userId);

  if (!userFound || !title || !amount || !spentAt || !category || !note) {
    return res.sendStatus(400);
  }

  const newExpense = expensesServices.create(req.body);

  res.statusCode = 201;
  res.send(newExpense);
};

const update = (req, res) => {
  const { expenseId } = req.params;

  const foundExpense = expensesServices.getById(expenseId);

  if (!foundExpense) {
    return res.sendStatus(404);
  }

  const expense = expensesServices.update({
    id: expenseId,
    ...req.body,
  });

  res.send(expense);
};

const remove = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expensesServices.getById(expenseId);

  if (!foundExpense) {
    return res.sendStatus(404);
  }

  expensesServices.remove(Number(expenseId));
  res.sendStatus(204);
};

module.exports = {
  getAll,
  getExpense,
  addExpense,
  update,
  remove,
};
