'use strict';

const expenses = [];

const getExpenses = () => expenses;

const getExpenseById = (id) =>
  expenses.find((expense) => expense.id === id) || null;

const getExpenseByUserId = (userId) =>
  expenses.filter((e) => e.userId === userId);

const addExpense = (userId, title, amount, category, note) => {
  const newExpense = {
    userId,
    spendAt: new Date(),
    title,
    amount,
    category,
    note,
    id: expenses.length + 1,
  };

  expenses.push(newExpense);

  return newExpense;
};

const removeExpense = (id) => {
  const expense = getExpenseById(id);

  if (expense) {
    expenses.filter((e) => e.id !== id);
  }
};

const updateExpense = (id, spendAt, title, amount, category, note) => {
  const expense = getExpenseById(id);

  if (expense) {
    expense.spendAt = spendAt;
    expense.title = title;
    expense.amount = amount;
    expense.category = category;
    expense.note = note;
  }

  return expense;
};

module.exports = {
  getExpenses,
  getExpenseById,
  getExpenseByUserId,
  removeExpense,
  addExpense,
  updateExpense,
};
