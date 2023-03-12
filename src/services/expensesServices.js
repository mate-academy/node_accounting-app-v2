'use strict';

let expenses = [];

const getDefault = () => (
  expenses = []
);

const getAllExpenses = filterParams => {
  const { userId, category, from, to } = filterParams;

  if (userId) {
    expenses = expenses.filter(expense => expense.userId === +userId);
  }

  if (category) {
    expenses = expenses.filter(expense => (
      expense.category === category
    ));
  }

  if (from) {
    expenses = expenses.filter(expense => (
      expense.spentAt >= from
    ));
  }

  if (to) {
    expenses = expenses.filter(expense => (
      expense.spentAt <= to
    ));
  }

  return expenses;
};

const getExpenseById = (expensesId) => {
  return expenses.find(expense => expense.id === expensesId) || null;
};

const addNewExpense = (userId,
  spentAt,
  title,
  amount,
  category,
  note,) => {
  const newExpense = {
    id: Math.max(0, ...expenses.map(expense => expense.id)) + 1,
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

const deleteExpense = (expenseId) => {
  const filteredExpenses = expenses.filter(expense => expense.id !== expenseId);

  if (expenses.length === filteredExpenses.length) {
    return false;
  }

  expenses = filteredExpenses;

  return true;
};

const updateExpense = (expenseId, params) => {
  const foundExpense = getExpenseById(expenseId);

  Object.assign(foundExpense, params);

  return foundExpense;
};

module.exports = {
  expensesServices: {
    getAllExpenses,
    getDefault,
    getExpenseById,
    addNewExpense,
    deleteExpense,
    updateExpense,
  },
};
