'use strict';

let expenses = [];

const getAllExpenses = (req) => {
  const { userId, categories, from, to } = req.query;
  let filteredExpenses = null;

  if (categories && userId) {
    filteredExpenses = expenses.filter(item => {
      return item.category === categories;
    });

    return filteredExpenses;
  };

  if (userId) {
    filteredExpenses = expenses.filter(item => {
      return item.userId === +userId;
    });

    return filteredExpenses;
  }

  if (from && to) {
    filteredExpenses = expenses.filter(item => {
      return item.spentAt > from && item.spentAt < to;
    });

    return filteredExpenses;
  }

  return expenses;
};

const resetExpenses = () => {
  expenses = [];
};

const getExpenseById = (id) => {
  return expenses.find(expense => expense.id === +id) || null;
};

const createExpense = (req) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  const expense = {
    id: expenses.length,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(expense);

  return expense;
};

const updateExpense = (title, expense) => {
  return Object.assign(expense, { title });
};

const deleteExpense = (req) => {
  const { id } = req.params;

  return expenses.filter(expense => expense.id !== +id);
};

const setExpenses = (newExpenses) => {
  expenses = newExpenses;
};

module.exports = {
  getAllExpenses,
  resetExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense,
  setExpenses,
};
