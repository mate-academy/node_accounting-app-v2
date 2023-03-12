'use strict';

const helpers = require('../helpers');

let expenses = [];

const setEmptyExpenses = () => {
  expenses = [];
};

const getAll = () => {
  return expenses;
};

const getOne = (expenseId) => {
  const neededExpense = expenses.find(expense => expense.id === expenseId);

  return neededExpense || null;
};

const addExpense = (expenseBody) => {
  const id = helpers.generateId(expenses);

  const newExpense = {
    id,
    ...expenseBody,
  };

  expenses.push(newExpense);

  return newExpense;
};

const updateExpense = (expenseId, expenseBody) => {
  const expenseToUpdate = getOne(expenseId);

  Object.assign(expenseToUpdate, expenseBody);

  return expenseToUpdate;
};

const deleteExpense = (expenseId) => {
  expenses = expenses.filter(expense => expense.id !== expenseId);
};

const filterExpenses = (expensesArr, filterParams) => {
  let filteredExpenses = expensesArr;

  const {
    userId,
    from,
    to,
    categories,
  } = filterParams;

  if (userId) {
    filteredExpenses = filteredExpenses
      .filter(expense => expense.userId === +userId);
  }

  if (from && to) {
    filteredExpenses = filteredExpenses.filter(expense => {
      const expenseTime = Date.parse(expense.spentAt);
      const fromTime = Date.parse(from);
      const toTime = Date.parse(to);

      return expenseTime >= fromTime && expenseTime <= toTime;
    });
  }

  if (categories) {
    filteredExpenses = filteredExpenses
      .filter(expense => expense.category === categories);
  }

  return filteredExpenses;
};

module.exports = {
  setEmptyExpenses,
  getAll,
  getOne,
  addExpense,
  updateExpense,
  deleteExpense,
  filterExpenses,
};
