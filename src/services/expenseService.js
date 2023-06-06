'use strict';

let expenses = [];

function reset() {
  expenses = [];
}

function getExpenses(userId, categories, from, to) {
  let filterExpense = expenses;

  if (userId) {
    filterExpense = filterExpense
      .filter(expense => Number(userId) === Number(expense));
  }

  if (categories) {
    filterExpense = filterExpense
      .filter(expense => categories.includes(expense.category));
  }

  if (from && to) {
    filterExpense = filterExpense
      .filter(expense => (expense.spentAt > from
        && expense.spentAt < to
      ));
  }

  if (from && !to) {
    filterExpense = filterExpense
      .filter(expense => (expense.spentAt >= from));
  }

  if (!from && to) {
    filterExpense = filterExpense
      .filter(expense => (expense.spentAt <= to));
  }

  return filterExpense;
}

function getUserById(userId) {
  return expenses
    .find(expense => expense.userId === Number(userId));
}

function getExpenseById(id) {
  return expenses
    .find(expense => expense.userId === Number(id));
}

function createExpense({
  userId,
  category,
  title,
  amount,
  spentAt,
  note,
}) {
  const newExpense = {
    id: expenses.length + 1,
    userId,
    category,
    title,
    amount,
    spentAt,
    note,
  };

  expenses.push(newExpense);

  return newExpense;
}

function deleteExpense(id) {
  expenses = expenses.filter(expense => expense.id !== Number(id));
}

function updateExpense(expense, req) {
  Object.assign(expense, req.body);

  return expense;
}

module.exports = {
  reset,
  getExpenses,
  getUserById,
  getExpenseById,
  createExpense,
  deleteExpense,
  updateExpense,
};
