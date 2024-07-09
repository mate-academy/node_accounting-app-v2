'use strict';

const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
};

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
    res.sendStatus(HTTP_STATUS.NOT_FOUND);

    return;
  }
  res.send(expenses);
};

const getOne = (req, res) => {
  const { id } = req.params;
  const expense = expensesService.getExpenseById(id);

  if (!expense) {
    res.sendStatus(HTTP_STATUS.NOT_FOUND);

    return;
  }
  res.send(expense);
};

const remove = (req, res) => {
  const { id } = req.params;

  const expense = expensesService.getExpenseById(id);

  if (!expense) {
    res.sendStatus(HTTP_STATUS.NOT_FOUND);

    return;
  }

  expensesService.deleteExpense(id);
  res.sendStatus(HTTP_STATUS.NO_CONTENT);
};

const create = (req, res) => {
  const props = req.body;

  const [arePropsValid, validatedProps] =
    expensesService.validateCreation(props);

  if (!arePropsValid) {
    res.sendStatus(HTTP_STATUS.BAD_REQUEST);

    return;
  }

  const expense = expensesService.createExpense(validatedProps);

  res.status(HTTP_STATUS.CREATED).send(expense);
};

const update = (req, res) => {
  const { id } = req.params;
  const props = req.body;

  const expense = expensesService.getExpenseById(id);

  if (!expense) {
    res.sendStatus(HTTP_STATUS.NOT_FOUND);

    return;
  }

  const [arePropsValid, validatedProps] = expensesService.validateUpdate(props);

  if (!arePropsValid) {
    res.sendStatus(HTTP_STATUS.BAD_REQUEST);

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
