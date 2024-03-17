/* eslint-disable no-param-reassign */
'use strict';

const newId = require('./index');

const expenses = [];

const clearExpenses = () => {
  expenses.length = 0;
};

const getExpenses = (userId, from, to, categories) => {
  let filteredExpenses = [...expenses];

  if (userId) {
    filteredExpenses = expenses.filter((expens) => expens.userId === +userId);
  }

  if (from && to) {
    filteredExpenses = expenses.filter((expens) => {
      const expenseDate = new Date(expens.spentAt);
      const fromDate = new Date(from);
      const toDate = new Date(to);

      return expenseDate >= fromDate && expenseDate <= toDate;
    });
  }

  if (categories) {
    filteredExpenses = expenses.filter(
      (expens) => expens.category === categories
    );
  }

  return filteredExpenses;
};

const getExpensesById = (id) => {
  const userExpens = expenses.find((expens) => expens.id === +id);

  return userExpens;
};

const createExpense = (newExpense) => {
  const { userId, spentAt, title, amount, category, note } = newExpense;

  const expens = {
    id: newId.generateID(expenses),
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(expens);

  return expens;
};

const changeExpense = (id, updateExpense) => {
  const indexToUpdate = expenses.findIndex((expense) => expense.id === +id);

  if (indexToUpdate !== -1) {
    expenses[indexToUpdate] = {
      ...expenses[indexToUpdate],
      ...updateExpense,
    };

    return expenses[indexToUpdate];
  }

  return null;
};

const deleteExpense = (id) => {
  const indexToDelete = expenses.findIndex((expense) => expense.id === +id);

  if (indexToDelete !== -1) {
    expenses.splice(indexToDelete, 1);
  }
};

module.exports = {
  clearExpenses,
  getExpenses,
  getExpensesById,
  createExpense,
  changeExpense,
  deleteExpense,
};
