'use strict';

const { getUsers } = require('./users');
const { getNextId } = require('../getNextId');

let expenses = [];

const getAll = (req, res) => {
  const { userId, categories, from, to } = req.query;

  if (userId) {
    expenses = expenses.filter(expense => expense.userId === Number(userId));
  }

  if (categories) {
    expenses = expenses.filter(({ category }) => (
      categories.includes(category)
    ));
  }

  if (from && to) {
    const fromDate = new Date(from);
    const toDate = new Date(to);

    expenses = expenses.filter(expense => {
      const expenseDate = new Date(expense.spentAt);

      return expenseDate < toDate && fromDate <= expenseDate;
    });
  };

  res.send(expenses);
};

const getOne = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expenses.find(expense => (
    expense.id === Number(expenseId)
  ));

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
};

const add = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;
  const hasAllData = userId && title && amount && category && note;
  const hasUser = getUsers().map(user => user.id).includes(Number(userId));

  if (!hasUser || !hasAllData) {
    res.sendStatus(400);

    return;
  }

  const newExpense = {
    id: getNextId(expenses),
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(newExpense);

  res.statusCode = 201;
  res.send(newExpense);
};

const remove = (req, res) => {
  const { expenseId } = req.params;
  const filteredExpenses = expenses.filter(expense => (
    expense.id !== Number(expenseId)
  ));

  if (filteredExpenses.length === expenses.length) {
    res.sendStatus(404);

    return;
  }

  expenses = filteredExpenses;
  res.sendStatus(204);
};

const update = (req, res) => {
  const { expenseId } = req.params;

  const foundExpense = expenses.find(expense => (
    expense.id === Number(expenseId)
  ));

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  Object.assign(foundExpense, req.body);

  res.send(foundExpense);
};

const removeExpenses = () => {
  expenses = [];
};

module.exports = {
  getAll,
  getOne,
  add,
  remove,
  update,
  removeExpenses,
};
