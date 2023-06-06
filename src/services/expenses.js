'use strict';

let expenses = [];

const getFilteredExpenses = (data) => {
  let filteredExpenses = expenses;

  const { userId, categories, from, to } = data;

  if (userId) {
    filteredExpenses = filteredExpenses.filter(
      (expense) => expense.userId === Number(userId)
    );
  }

  if (categories) {
    filteredExpenses = filteredExpenses.filter(
      (expense) => expense.category === categories
    );
  }

  if (from && to) {
    filteredExpenses = filteredExpenses.filter((expense) => {
      return expense.spentAt >= from && expense.spentAt <= to;
    });
  }

  return filteredExpenses;
};

const getById = (expenseId) =>
  expenses.find((expense) => expense.id === Number(expenseId)) || null;

const create = (data) => {
  const { title, amount, spentAt, category, userId, note } = data;

  const newExpense = {
    id: expenses.length + 1,
    title,
    amount: amount || 0,
    spentAt: spentAt || new Date(Date.now()).toISOString(),
    category: category || '',
    userId: userId || 0,
    note: note || '',
  };

  expenses.push(newExpense);

  return newExpense;
};

const update = ({ id, ...data }) => {
  const expense = getById(id);

  Object.assign(expense, data);

  return expense;
};

const remove = (expenseId) => {
  expenses = expenses.filter((expense) => expense.id !== expenseId);
};

const reset = () => {
  expenses = [];
};

module.exports = {
  getFilteredExpenses,
  getById,
  create,
  update,
  remove,
  reset,
};
