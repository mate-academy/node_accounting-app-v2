'use strict';

let expenses = [];

const initial = () => (
  expenses = []
);

const getAll = (category, from, to, userId) => {
  let filteredExpenses = expenses;

  if (from && to) {
    filteredExpenses = filteredExpenses.filter(expense =>
      expense.spentAt >= from
      && expense.spentAt <= to);
  }

  if (userId) {
    filteredExpenses = filteredExpenses.filter(expense =>
      expense.userId === +userId);
  }

  if (category) {
    filteredExpenses = filteredExpenses.filter(expense =>
      expense.category === category);
  }

  return filteredExpenses;
};

const create = (userId, spentAt, title, amount, category, note) => {
  const maxId = expenses.length
    ? Math.max(...expenses.map(expense => expense.id))
    : 0;

  const newExpense = {
    id: maxId + 1,
    userId,
    title,
    amount,
    spentAt,
    category,
    note,
  };

  expenses.push(newExpense);

  return newExpense;
};

const findById = (expensesId) => {
  const foundExpense = expenses.find(expense => expense.id === +expensesId);

  return foundExpense || null;
};

const remove = (expensesId) => {
  expenses = expenses.filter(expense => expense.id !== +expensesId);

  return expenses;
};

const change = (expenseId, filed, title) => {
  const foundExpense = findById(expenseId);

  Object.assign(foundExpense, {
    ...filed, title,
  });

  return foundExpense;
};

module.exports = {
  getAll, create, findById, remove, change, initial,
};
