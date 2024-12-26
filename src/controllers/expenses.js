'use strict';

const { ExpenseModel } = require('../models/expenses');
const { UserModel } = require('../models/users');

const getAllExpenses = (req, res) => {
  const { userId, categories, from, to } = req.query;
  const expenses = ExpenseModel.getExpenses(userId, categories, from, to);

  res.send(expenses);
};

const addNewExpense = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

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

  const user = UserModel.getUser(+userId);

  if (!newExpense || !user) {
    res.status(400).send('Bad request');

    return;
  }

  res.statusCode = 201;
  res.send(newExpense);
};

const getOneExpense = (req, res) => {
  const { expenseId } = req.params;
  const expense = ExpenseModel.getExpense(expenseId);

  if (!expense) {
    res.status(404).send('Expense not found');

    return;
  }

  res.send(expense);
};

const deleteExpense = (req, res) => {
  const { expenseId } = req.params;

  const expense = ExpenseModel.removeExpense(expenseId);

  if (!expense) {
    res.status(404).send('Expense not found');

    return;
  }

  res.status(204).send('No Content');
};

const updateExpense = (req, res) => {
  const id = req.params.expenseId;
  const paramsToChange = req.body;

  const updatedExpense = ExpenseModel.updateExpense(id, paramsToChange);

  if (!updatedExpense) {
    res.status(404).send('Expense not found');

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
