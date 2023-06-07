'use strict';

let expenses = [];

let newId = expenses.length;

const getFilteredExpenses = (data) => {
  let filteredExpenses = expenses;

  const { userId, categories, from, to } = data;

  if (userId) {
    filteredExpenses = filteredExpenses.filter(
      (expense) => expense.userId === Number(userId)
    );
  }

  if (categories) {
    filteredExpenses = filteredExpenses.filter((expense) =>
      categories.includes(expense.category)
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
    id: newId,
    title,
    amount,
    spentAt,
    category,
    userId,
    note,
  };

  newId += 1;

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
