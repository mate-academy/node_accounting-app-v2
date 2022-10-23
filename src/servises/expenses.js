'use strict';

let expenses = [];

function getExpenses({ userId, category, from, to }) {
  let filteredExpenses = expenses;

  if (userId) {
    filteredExpenses = filteredExpenses.filter(expense => (
      expense.userId === +userId
    ));
  }

  if (category) {
    filteredExpenses = filteredExpenses.filter(expense => (
      category.includes(expense.category)
    ));
  }

  if (from) {
    filteredExpenses = filteredExpenses.filter(expense => (
      new Date(from) < new Date(expense.spentAt)
    ));
  }

  if (to) {
    filteredExpenses = filteredExpenses.filter(expense => (
      new Date(to) > new Date(expense.spentAt)
    ));
  }

  return filteredExpenses;
};

function getExpenseById(expenseId) {
  const neededExpense = expenses.find(expense => expense.id === +expenseId);

  return neededExpense || null;
}

function createExpense(
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
) {
  const newExpense = {
    id: Math.floor(Math.random() * 10000),
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

function updateExpense(
  expenseId,
  spentAt,
  title,
  amount,
  category,
  note
) {
  const expense = getExpenseById(+expenseId);

  Object.assign(expense, {
    spentAt: spentAt || expense.spentAt,
    title: title || expense.title,
    amount: amount || expense.amount,
    category: category || expense.category,
    note: note || expense.note,
  });

  return expense;
}

function removeExpense(expenseId) {
  const filtered = expenses.filter(expense => expense.id !== +expenseId);

  return filtered;
}

function deleteAll() {
  expenses = [];
}

module.exports = {
  getExpenses,
  getExpenseById,
  createExpense,
  removeExpense,
  updateExpense,
  deleteAll,
};
