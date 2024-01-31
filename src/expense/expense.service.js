'use strict';

const { getUserById } = require('../user/user.service.js');

let expenses = [];

const getExpenses = ({ categories, from, to, userId }) => {
  let filteredExpenses = expenses;

  if (userId) {
    filteredExpenses = filteredExpenses.filter(
      (expense) => expense.userId === userId
    );
  }

  if (categories) {
    filteredExpenses = filteredExpenses.filter(
      (expense) => categories.includes(expense.category)
    );
  }

  if (from) {
    filteredExpenses = filteredExpenses.filter(
      (expense) =>
        new Date(expense.spentAt).valueOf() >= new Date(from).valueOf()
    );
  }

  if (to) {
    filteredExpenses = filteredExpenses.filter(
      (expense) =>
        new Date(expense.spentAt).valueOf() <= new Date(to).valueOf()
    );
  }

  return filteredExpenses;
};

const getExpenseById = (id) => {
  return expenses.find(expense => expense.id === id);
};

const createExpense = (expense) => {
  const user = getUserById(parseInt(expense.userId));

  if (!user) {
    return;
  }

  const newExpense = {
    ...expense,
    id: new Date().valueOf(),
  };

  expenses.push(newExpense);

  return newExpense;
};

const updateExpenseById = (id, expense) => {
  const expenseToUpdate = getExpenseById(id);

  if (!expenseToUpdate) {
    return;
  }

  Object.assign(expenseToUpdate, { ...expense });

  return expenseToUpdate;
};

const deleteExpenseById = (id) => {
  const expenseToDelete = getExpenseById(id);

  if (!expenseToDelete) {
    return;
  }

  expenses = expenses.filter(item => item.id !== id);

  return expenseToDelete;
};

const cleanExpenses = () => {
  expenses = [];
};

module.exports = {
  getExpenses,
  createExpense,
  cleanExpenses,
  getExpenseById,
  updateExpenseById,
  deleteExpenseById,
};
