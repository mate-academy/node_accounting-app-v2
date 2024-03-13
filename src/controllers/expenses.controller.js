'use strict';

const expenseService = require('../services/expenses.service');
const { getUserById } = require('../services/users.service');

const getAll = (req, res) => {
  const { userId, categories, from, to } = req.query;

  res.send(expenseService.getAllExpenses(userId, categories, from, to));
};

const getOneById = (req, res) => {
  const { id } = req.params;
  const expense = expenseService.getExpenseById(+id);

  if (!expense) {
    res.status(404).send();
  }

  res.send(expense);
};

const create = (req, res) => {
  const newExpense = req.body;
  const { userId } = req.body;

  if (!userId || !getUserById(userId)) {
    res.status(400).send();

    return;
  }

  if (!expenseService.getExpenseByUserId(+userId)) {
    res.status(404).send();

    return;
  }

  const createdExpense = expenseService.createExpense(newExpense);

  res.status(201).send(createdExpense);
};

const update = (req, res) => {
  const { id } = req.params;
  const newExpense = req.body;

  if (!newExpense) {
    res.sendStatus(400);

    return;
  }

  const expense = expenseService.getExpenseById(id);

  if (!expense) {
    res.status(404).send();

    return;
  }

  const updatedExpense = expenseService.updateExpense(id, newExpense);

  if (!updatedExpense) {
    res.status(404).send();

    return;
  }

  res.send(updatedExpense);
};

const remove = (req, res) => {
  const { id } = req.params;
  const expense = expenseService.getExpenseById(id);

  if (!expense) {
    res.status(404).send();

    return;
  }

  expenseService.removeExpense(+id);
  res.status(204).send();
};

module.exports = {
  getAll,
  getOneById,
  create,
  update,
  remove,
};
