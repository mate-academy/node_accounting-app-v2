'use strict';

// const userService = require('./users');

let expenses = [];
let countExtendseId = 1;

const initExpenses = () => {
  expenses = [];
};

const createExpense = (spentAt, userId, title, amount, category, note) => {
  const newExpense = {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  Object.assign(newExpense, { id: countExtendseId++ });
  expenses.push(newExpense);

  return newExpense;
};

const getExpenses = (
  userId,
  category,
  from,
  to,) => {
  if (from && to) {
    const filterExpenses = expenses.filter(expense =>
      expense.spentAt >= from && expense.spentAt <= to);

    return filterExpenses;
  }

  if (userId && category) {
    const filterExpenses = expenses.filter(expense =>
      expense.userId === +userId
    ).filter(expense =>
      expense.category === category);

    return filterExpenses;
  }

  if (userId) {
    const filterExpenses = expenses.filter(expense =>
      expense.userId === +userId
    );

    return filterExpenses;
  }

  return expenses;
};

const getExpensesId = (expensId) => {
  const foundExpens = expenses.find(expens => expens.id === +expensId);

  return foundExpens;
};

const deleteExpense = (expensId) => {
  expenses = expenses.filter(expens => expens.id !== +expensId);

  return expenses;
};

const updateExpendse = (expensId, title) => {
  const foundExpens = getExpensesId(expensId);

  Object.assign(foundExpens, { title });

  return foundExpens;
};

module.exports = {
  initExpenses,
  createExpense,
  getExpenses,
  getExpensesId,
  deleteExpense,
  updateExpendse,
};
