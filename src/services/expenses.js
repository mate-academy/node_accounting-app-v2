'use strict';

let expenses = [];

const reset = () => {
  expenses = [];
};

const getAll = (userId, category, from, to) => {
  let visibleExpenses = expenses;

  if (userId) {
    visibleExpenses = visibleExpenses
      .filter(expense => expense.userId === Number(userId));
  }

  if (category) {
    visibleExpenses = visibleExpenses
      .filter(expense => expense.category === category);
  }

  if (from && to) {
    visibleExpenses = visibleExpenses.filter(
      expense => expense.spentAt >= from && expense.spentAt <= to,
    );
  }

  return visibleExpenses;
};

const getById = (expenseId) => {
  const foundExpense = expenses
    .find(expense => expense.id === Number(expenseId));

  return foundExpense || null;
};

const addOne = (newExpanse) => {
  const maxId = Math.max(...expenses.map(user => user.id));

  newExpanse.id = expenses.length ? maxId + 1 : 1;

  expenses = [...expenses, newExpanse];

  return newExpanse;
};

const deleteOne = (expenseId) => {
  expenses = expenses.filter(expanse => expanse.id !== Number(expenseId));
};

const updateOne = (expenseId, newData) => {
  const expense = getById(expenseId);

  Object.assign(expense, newData);

  return expense;
};

module.exports = {
  reset,
  getAll,
  getById,
  addOne,
  deleteOne,
  updateOne,
};
