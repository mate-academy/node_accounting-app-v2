'use strict';

const expensesServices = require('../Services/expenses');
const userServices = require('../Services/users.js');

const getAll = (req, res) => {
  const expenses = expensesServices.getAll(req.query);

  res.status(200).send(expenses);
};

const add = (req, res) => {
  const { userId } = req.body;
  const user = userServices.getUserById(userId);

  if (!user) {
    res.sendStatus(400);
  } else {
    const newExpense = expensesServices.createExpense(req.body);

    res.status(201).send(newExpense);
  }
};

const getExpense = (req, res) => {
  const expense = expensesServices.getById(req.params.expenseId);

  if (!expense) {
    res.sendStatus(404);
  } else {
    res.status(200).send(expense);
  }
};

const remove = (req, res) => {
  const expense = expensesServices.getById(req.params.expenseId);

  if (!expense) {
    res.sendStatus(404);
  } else {
    expensesServices.remove(req.params.expenseId);
    res.sendStatus(204);
  }
};

const update = (req, res) => {
  const expense = expensesServices.getById(req.params.expenseId);

  if (!expense) {
    res.sendStatus(404);
  } else {
    const updatedExpense
    = expensesServices.updateExpense(req.params.expenseId, req.body);

    res.status(200).send(updatedExpense);
  }
};

module.exports = {
  getAll,
  add,
  getExpense,
  remove,
  update,
};
