'use strict';

let expenses = [];

const getAll = (
  userId = null, category = null, fromDate = null, toDate = null
) => {
  let allExpenses = expenses;

  if (userId) {
    allExpenses = allExpenses.filter(expense => expense.userId === userId);
  }

  if (category) {
    allExpenses = allExpenses.filter(expense => expense.category === category);
  }

  if (fromDate) {
    allExpenses = allExpenses.filter(expense => expense.spentAt > fromDate);
  }

  if (toDate) {
    allExpenses = allExpenses.filter(expense => expense.spentAt < toDate);
  }

  return allExpenses;
};

const getById = (expenseId) => {
  const foundExpense = expenses.find(expense => expense.id === expenseId);

  return foundExpense || null;
};

const create = (userId, spentAt, title, amount, category, note) => {
  const maxId = Math.max(...expenses.map(expense => expense.id));

  const newExpense = {
    id: maxId > 0 ? maxId + 1 : 1,
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

const remove = (expenseId) => {
  expenses = expenses.filter(expense => expense.id !== expenseId);
};

const update = (expenseId, newData) => {
  const expense = getById(expenseId);

  Object.assign(expense, newData);

  return expense;
};

const clear = () => {
  expenses = [];
};

module.exports = {
  getAll, getById, create, remove, update, clear,
};
