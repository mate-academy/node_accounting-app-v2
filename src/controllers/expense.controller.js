'use strict';

const expenseService = require('../services/expense.service');
const { getAll } = require('../services/user.service');

const get = (req, res) => {
  const allExpenses = expenseService.getAllExpenses(req);

  return res.send(allExpenses);
};

const getOne = (req, res) => {
  const { id } = req.params;

  const expense = expenseService.getExpenseById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  return res.json(expense);
};

const post = (req, res) => {
  const newExpense = expenseService.createExpense(req);

  const { userId, title } = req.body;

  const userToFind = getAll().find(user => user.id === +userId);

  if (!title || !userToFind) {
    res.sendStatus(400);

    return;
  }

  res.status(201).json(newExpense);
};

const update = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const expense = expenseService.getExpenseById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  if (typeof title !== 'string') {
    res.sendStatus(422);

    return;
  }

  const updatedExpense = expenseService.updateExpense(title, expense);

  res.send(updatedExpense);
};

const remove = (req, res) => {
  const newExpenses = expenseService.deleteExpense(req);

  if (newExpenses.length === expenseService.getAllExpenses(req).length) {
    res.sendStatus(404);

    return;
  }

  expenseService.setExpenses(newExpenses);

  res.sendStatus(204);
};

module.exports = {
  get,
  getOne,
  post,
  update,
  remove,
};
