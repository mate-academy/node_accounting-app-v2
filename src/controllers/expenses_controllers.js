'use strict';

const { expenseServices } = require('../services/expenses_services');
const { userServices } = require('./users_controllers');

const getExpenses = (req, res) => {
  const searchParams = req.query;

  if (!searchParams) {
    res.status(200).send(expenseServices.getAll());
  }

  const foundExpenses = expenseServices.getByParams(searchParams);

  if (!foundExpenses) {
    res.sendStatus(404);

    return;
  }

  res.status(200).send(foundExpenses);
};

const getExpenseById = (req, res) => {
  const { id } = req.params;

  const foundExpense = expenseServices.getById(id);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.status(200).send(foundExpense);
};

const addExpense = (req, res) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
  } = req.body;

  if (!userId
    || !spentAt
    || !title
    || !amount
    || !category
  ) {
    res.sendStatus(400);

    return;
  }

  const user = userServices.getById(userId);

  if (!user) {
    res.sendStatus(400);

    return;
  }

  res.status(201).send(expenseServices.add(req.body));
};

const removeExpense = (req, res) => {
  const { id } = req.params;

  const foundExpense = expenseServices.getById(id);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }
  expenseServices.remove(id);
  res.sendStatus(204);
};

const updateExpense = (req, res) => {
  const { id } = req.params;

  const foundExpense = expenseServices.getById(id);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.status(200).send(expenseServices.update(id, req.body));
};

module.exports = {
  getExpenses,
  getExpenseById,
  addExpense,
  removeExpense,
  updateExpense,
};
