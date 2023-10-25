'use strict';

const expenses = [];

const getExpenses = () => expenses;

const getExpense = (expId) => expenses.find(exp => exp.id === expId);

const createExpense = (newExpense) => expenses.push(newExpense);

const expenseIndex = (id) => expenses.findIndex(exp => exp.id === id);

const updateExpense = (index,
  userId, spentAt, title, amount, category, note) => {
  const exp = expenses[index];

  if (userId !== undefined) {
    exp.userId = userId;
  }

  if (spentAt !== undefined) {
    exp.spentAt = spentAt;
  }

  if (title !== undefined) {
    exp.title = title;
  }

  if (amount !== undefined) {
    exp.amount = amount;
  }

  if (category !== undefined) {
    exp.category = category;
  }

  if (note !== undefined) {
    exp.note = note;
  }

  return exp;
};

const deleteExpense = (index) => expenses.splice(index, 1);

const getId = () => Math.max(...expenses.map(exp => exp.id)) + 1;

const clear = () => {
  expenses.length = 0;
};

const expenseServices = {
  getExpenses,
  getExpense,
  createExpense,
  expenseIndex,
  updateExpense,
  deleteExpense,
  getId,
  clear,
};

module.exports = {
  expenseServices,
};
