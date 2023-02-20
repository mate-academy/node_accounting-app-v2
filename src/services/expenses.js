'use strict';

const expenses = [];

const getExpenses = (userId, from, to) => {
  let filteredExpenses = [...expenses];

  if (!userId && !from && !to) {
    return filteredExpenses;
  }

  if (userId) {
    filteredExpenses = filteredExpenses.filter((e) => e.userId === userId);
  }

  if (from && to) {
    const fromDate = new Date(from);
    const toDate = new Date(to);

    if (fromDate > toDate) {
      return [];
    }

    filteredExpenses = filteredExpenses.filter(
      (e) => e.spendAt >= fromDate && e.spendAt <= toDate
    );
  }

  return filteredExpenses;
};

const getBetweenDates = (from, to) => {
  if (!from || !to) {
    return null;
  }

  const fromDate = new Date(from);
  const toDate = new Date(to);

  if (fromDate > toDate) {
    return null;
  }

  return expenses.filter((e) => e.spendAt >= fromDate && e.spendAt <= toDate);
};

const getExpenseById = (id) => {
  return expenses.find((expense) => expense.id === id) || null;
};

const getExpenseByUserId = (userId) => {
  return expenses.filter((e) => e.userId === userId);
};

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
  getBetweenDates,
};
