'use strict';

let expenses = [];

const initialExpenses = () => {
  expenses = [];
};

const getAllExpenses = (userId, category, from, to) => {
  let filteredExpenses = expenses;

  if (userId) {
    filteredExpenses = filteredExpenses
      .filter(expense => expense.userId === Number(userId));
  }

  if (category) {
    filteredExpenses = filteredExpenses
      .filter(expense => expense.category === category);
  }

  if (from) {
    filteredExpenses = filteredExpenses
      .filter(expense => expense.spentAt > from);
  }

  if (to) {
    filteredExpenses = filteredExpenses
      .filter(expense => expense.spentAt < to);
  }

  return filteredExpenses;
};

const getExpensesById = (expenseId) => {
  const foundExpense = expenses
    .find(expense => expense.id === Number(expenseId));

  return foundExpense || null;
};

const addExpense = (userId, spentAt, title, amount, category, note) => {
  let newExpense = {};

  if (!expenses.length) {
    newExpense = {
      id: 0,
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    };
  } else {
    const maxId = Math.max(...expenses.map(expense => expense.id));

    newExpense = {
      id: maxId + 1,
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    };
  }

  expenses.push(newExpense);

  return newExpense;
};

const deleteExpense = (expenseId) => {
  expenses = expenses
    .filter(expense => expense.id !== Number(expenseId));
};

const updateExpense = (
  foundExpense,
  spentAt,
  title,
  amount,
  category,
  note,
) => {
  if (spentAt) {
    Object.assign(foundExpense, { spentAt });
  }

  if (title) {
    Object.assign(foundExpense, { title });
  }

  if (amount) {
    Object.assign(foundExpense, { amount });
  }

  if (category) {
    Object.assign(foundExpense, { category });
  }

  if (note) {
    Object.assign(foundExpense, { note });
  }

  return foundExpense;
};

module.exports = {
  initialExpenses,
  getAllExpenses,
  getExpensesById,
  addExpense,
  deleteExpense,
  updateExpense,
};
