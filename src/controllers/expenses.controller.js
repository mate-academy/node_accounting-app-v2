'use strict';

const expensesService = require('../services/expenses.service');

const get = (req, res) => {
  const { userId, categories, from, to } = req.query;

  const expenses = expensesService.getExpenses({
    userId,
    categories,
    from,
    to,
  });

  if (!expenses) {
    res.sendStatus(404);

    return;
  }
  res.send(expenses);
};

const getOne = (req, res) => {
  const { id } = req.params;
  const expense = expensesService.getExpenseById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }
  res.send(expense);
};

const remove = (req, res) => {
  const { id } = req.params;

  const expense = expensesService.getExpenseById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  expensesService.deleteExpense(id);
  res.sendStatus(204);
};

const create = (req, res) => {
  const props = req.body;

  const [arePropsValid, validatedProps]
    = expensesService.validateCreation(props);

  if (!arePropsValid) {
    res.sendStatus(400);

    return;
  }

  const expense = expensesService.createExpense(validatedProps);

  res.status(201).send(expense);
};

const update = (req, res) => {
  const { id } = req.params;
  const props = req.body;

  const expense = expensesService.getExpenseById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  const [arePropsValid, validatedProps]
    = expensesService.validateUpdate(props);

  if (!arePropsValid) {
    res.sendStatus(400);

    return;
  }

  const updatedExpense = expensesService.updateExpense(id, validatedProps);

  res.send(updatedExpense);
};

module.exports = {
  get,
  getOne,
  create,
  remove,
  update,
};
