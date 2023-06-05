'use strict';

const { getAllUsers } = require('./users');

let expenses = [];

const getAll = (req, res) => {
  const { userId, categories, from, to } = req.query;

  if (userId) {
    expenses = expenses.filter(expense => expense.userId === +userId);
  }

  if (categories) {
    expenses = expenses.filter(({ category }) => (
      categories.includes(category)
    ));
  }

  if (from && to) {
    expenses = expenses.filter(expense => {
      const expenseDate = new Date(expense.spentAt);
      const fromDate = new Date(from);
      const toDate = new Date(to);

      return expenseDate < toDate && fromDate <= expenseDate;
    });
  };

  res.send(expenses);
};

const getOne = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expenses.find(expense => expense.id === +expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
};

const add = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;
  const hasAllData = userId && title && amount && category && note;
  const hasUser = getAllUsers().map(user => user.id).includes(userId);

  if (!hasUser || !hasAllData) {
    res.sendStatus(400);

    return;
  }

  const newExpense = {
    id: Math.random(),
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
    expense.id !== +expenseId
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
    expense.id.toString() === expenseId
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
