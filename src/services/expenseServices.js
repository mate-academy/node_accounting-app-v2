'use strict';

let expenses = [];

function resetExpenses() {
  expenses = [];
}

function getExpenses(userId, categories, from, to) {
  let filteredExpenses = expenses;

  if (userId) {
    filteredExpenses = filteredExpenses
      .filter(expense => +expense.userId === +userId);
  }

  if (categories) {
    filteredExpenses = filteredExpenses
      .filter(expense => categories.includes(expense.category));
  }

  if (from && to) {
    filteredExpenses = filteredExpenses
      .filter(expense => (
        expense.spentAt > from
        && expense.spentAt < to
      ));
  }

  if (from && !to) {
    filteredExpenses = filteredExpenses
      .filter(expense => expense.spentAt >= from);
  }

  if (to && !from) {
    filteredExpenses = filteredExpenses
      .filter(expense => expense.spentAt <= to);
  }

  return filteredExpenses;
};

function getExpenseByUserId(userId) {
  const foundExpense = expenses.find(expense => expense.userId === +userId);

  return foundExpense;
}

function getExpenseById(id) {
  const foundExpense = expenses.find(expense => expense.id === +id);

  return foundExpense;
}

function createExpense({
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
}) {
  const newExpense = {
    id: expenses.length + 1,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(newExpense);

  return newExpense;
}

function deleteExpense(id) {
  expenses = expenses.filter(expense => expense.id !== +id);
}

function updateExpense(expense, req) {
  Object.assign(expense, req.body);

  return expense;
}

module.exports = {
  getExpenses,
  getExpenseByUserId,
  getExpenseById,
  createExpense,
  deleteExpense,
  updateExpense,
  resetExpenses,
};
