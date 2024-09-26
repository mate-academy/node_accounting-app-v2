'use strict';

const expensesService = require('../services/expenses');

const getAll = (req, res) => {
  const queryParams = req.body;

  if (queryParams) {
    const filteredExpenses = expensesService.getAll(queryParams);

    res.send(filteredExpenses);
  }

  const expenses = expensesService.getAll();

  res.send(expenses);
};

const getOne = (req, res) => {
  const { expenseId } = req.params;

  const foundExpens = expensesService.getById(expenseId);

  if (!foundExpens) {
    res.sendStatus(404);

    return;
  }

  res.status(200);
  res.send(foundExpens);
};

const add = (req, res) => {
  const { userId, spentAt, title, amount, category } = req.body;

  if (!userId || !spentAt || !title || !amount || !category) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expensesService.create(req.body);

  res.status(201);
  res.send(newExpense);
};

const remove = (req, res) => {
  const { expenseId } = req.params;
  const foundExpens = expensesService.getById(expenseId);

  if (!foundExpens) {
    res.sendStatus(404);

    return;
  };

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

  res.status(200);
  res.send(updatedExpense);
};

module.exports = {
  getAll,
  getOne,
  add,
  remove,
  update,
};
