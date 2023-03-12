'use strict';

let expenses = [];

const getInitialExpenses = () => {
  expenses = [];
};

const getAllExpenses = ({ userId, from, to, categories }) => {
  if (userId) {
    expenses = expenses.filter(expense => expense.userId === userId);
  }

  if (from) {
    expenses = expenses.filter(expense => expense.spentAt > from);
  }

  if (to) {
    expenses = expenses.filter(expense => expense.spentAt < to);
  }

  if (categories) {
    expenses = expenses.filter(expense => expense.category === categories);
  }

  return expenses;
};

const addExpense = (
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
) => {
  const newExpense = {
    id: Math.max(...expenses.map(expense => expense.id), 0) + 1,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(newExpense);

  return newExpense;
};

const getExpenseById = (id) => {
  const foundExpense = expenses.find(expense => expense.id === id) || null;

  return foundExpense;
};

const deleteExpense = (id) => {
  const filtredExpenses = expenses.filter(expense => expense.id !== id);

  if (filtredExpenses.length === expenses.length) {
    return false;
  }

  expenses = filtredExpenses;

  return true;
};

const updateExpense = (expense, paramsToUpdate) => {
  return Object.assign(expense, paramsToUpdate);
};

module.exports = {
  expensesServices: {
    getAllExpenses,
    addExpense,
    getExpenseById,
    deleteExpense,
    updateExpense,
    getInitialExpenses,
  },
};
