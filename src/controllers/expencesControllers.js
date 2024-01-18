'use strict';

const {
  getAllExpenses,
  getExpensesById,
  postExpense,
  deleteExpense,
  updateExpense,
} = require('../services/expensesServices.js');

const getExpenses = (req, res) => {
  res.send(getAllExpenses());
};

const getOneExpense = (req, res) => {
  const { id } = req.params;

  const expense = getExpensesById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.send(expense);
};

const addExpense = (req, res) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  if (!userId || !spentAt || !title || !amount || !category || !note) {
    res.sendStatus(404);
    res.send('all fields are required');

    return;
  }

  const newExpense = postExpense(
    userId, spentAt, title, amount, category, note
  );

  if (!newExpense) {
    res.sendStatus(500);

    return;
  }

  res.sendStatus(201);

  res.send(newExpense);
};

const changeExpense = (req, res) => {
  const { id } = req.params;
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  const expense = getExpensesById(id);

  if (!expense) {
    res.sendStatus(404);
    res.send('you don\'t have such expense');
  }

  if (typeof userId !== 'string'
    || typeof spentAt !== 'string'
    || typeof title !== 'string'
    || typeof amount !== 'number'
    || typeof category !== 'string') {
    res.sendStatus(422);
    res.send('Invalid request data');

    return;
  }

  const updatedExpense = updateExpense(
    id, userId, spentAt, title, amount, category, note
  );

  res.send(updatedExpense);
};

const removeExpense = (req, res) => {
  const { id } = req.params;

  const expense = getExpensesById(id);

  if (!expense) {
    res.sendStatus(404);
    res.send('Expense not found');

    return;
  }

  deleteExpense(id);
  res.sendStatus(204);
};

module.exports = {
  getExpenses,
  getOneExpense,
  addExpense,
  removeExpense,
  changeExpense,
};
