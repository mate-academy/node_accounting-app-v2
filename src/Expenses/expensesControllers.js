'use strict';

const expensesServices = require('./expensesServices');

const getAllExpenses = (req, res) => {
  res.send(expensesServices.getAll());
};

const getOneExpense = (req, res) => {
  const { expenseId } = req.params;

  if (!expenseId) {
    res.sendStatus(400);

    return;
  }

  const foundExpense = expensesServices.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
};

const addExpense = (req, res) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
  } = req.body;

  const hasBody = userId && spentAt && title && amount && category;

  if (!hasBody) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expensesServices.create(req.body);

  res.status(201);
  res.send(newExpense);
};

const deleteExpense = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expensesServices.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expensesServices.remove(expenseId);
  res.sendStatus(204);
};

const updateExpense = (req, res) => {
  const { expenseId } = req.params;
  const {
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  const hasBody = spentAt && title && amount && category;

  if (!expenseId || !hasBody) {
    res.sendStatus(400);

    return;
  }

  const foundExpense = expensesServices.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expensesServices.update({
    id: expenseId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.send(foundExpense);
};

module.exports = {
  getAllExpenses,
  getOneExpense,
  addExpense,
  deleteExpense,
  updateExpense,
};
