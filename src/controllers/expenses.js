'use strict';

const { ExpenseModel } = require('../models/expenses');

const getAllExpenses = (req, res) => {
  const { userId, categories, from, to } = req.query;
  const expenses = ExpenseModel.getExpenses(
    userId,
    categories,
    from,
    to,
  );

  res.send(expenses);
};

const addNewExpense = (req, res) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  if (!userId || !spentAt || !title || !amount || !category) {
    res.status(400).send('Bad request');

    return;
  }

  const newExpense = ExpenseModel.addExpense({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  if (!newExpense) {
    res.status(400).send('Bad request');

    return;
  }

  res.statusCode = 201;
  res.send(newExpense);
};

const getOneExpense = (req, res) => {
  const { id } = req.params;
  const expense = ExpenseModel.getExpense(id);

  if (!expense) {
    res.status(404).send('Expense not found');

    return;
  }

  res.send(expense);
};

const deleteExpense = (req, res) => {
  const { id } = req.params;

  const expense = ExpenseModel.removeExpense(id);

  if (!expense) {
    res.status(404).send('Expense not found');

    return;
  }

  res.send(expense);
};

const updateExpense = (req, res) => {
  const { id } = req.params;
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  const updatedExpense = ExpenseModel.updateExpense({
    id: +id,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  if (!updatedExpense) {
    res.status(404).send('Expense not found');

    return;
  }

  if (!userId || !spentAt || !title || !amount || !category) {
    res.status(400).send('Bad request');

    return;
  }

  res.status(200).send(updatedExpense);
};

module.exports = {
  getAllExpenses,
  addNewExpense,
  getOneExpense,
  deleteExpense,
  updateExpense,
};
