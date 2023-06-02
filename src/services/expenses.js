'use strict';

let expenses = [];
const { returnAll } = require('./users');
const getAll = (req, res) => {
  const { userId, categories, from, to } = req.query;

  if (userId) {
    expenses = expenses.filter(expense => (
      expense.userId.toString() === userId
    ));
  }

  if (categories) {
    expenses = expenses.filter(expense => (
      categories.includes(expense.category)
    ));
  }

  if (from && to) {
    expenses = expenses.filter(expense => {
      const expenseDate = new Date(expense.spentAt);
      const fromDate = new Date(from);
      const toDate = new Date(to);

      return expenseDate < toDate && fromDate <= expenseDate;
    });
  }
  res.send(expenses);

  return expenses;
};

const getById = (req, res) => {
  const { expenseId } = req.params;

  const foundExpense = expenses.find(expense => (
    expense.id.toString() === expenseId
  ));

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
};

const create = (req, res) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;
  const users = returnAll();
  const allUsersId = users.map(user => user.id);
  const hasAllData = userId && title && amount && category && note;
  const hasUser = allUsersId.includes(userId);

  if (!hasUser || !hasAllData) {
    res.sendStatus(400);

    return;
  }

  const id = expenses.length + 1;
  const expense = {
    id,
    userId: +userId,
    spentAt,
    title,
    amount: +amount,
    category,
    note,
  };

  expenses.push(expense);

  res.statusCode = 201;
  res.send(expense);
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

const remove = (req, res) => {
  const { expenseId } = req.params;
  const filteredExpenses = expenses.filter(({ id }) => (
    id.toString() !== expenseId
  ));

  if (filteredExpenses.length === expenses.length) {
    res.sendStatus(404);

    return;
  }

  expenses = filteredExpenses;

  res.sendStatus(204);
};

const removeAll = () => {
  expenses = [];
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  removeAll,
};
