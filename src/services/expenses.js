'use strict';

let expenses = [];

function clearExpenses() {
  expenses = [];
}

function getAllByQuery(userId, categories, from, to) {
  let filtredExpenses = expenses;

  if (userId) {
    filtredExpenses = filtredExpenses.filter(expense => (
      expense.userId === +userId
    ));
  }

  if (categories) {
    filtredExpenses = filtredExpenses.filter(expense => (
      categories.includes(expense.category)
    ));
  }

  if (from) {
    filtredExpenses = filtredExpenses.filter(expense => (
      new Date(expense.spentAt) > new Date(from)
    ));
  }

  if (to) {
    filtredExpenses = filtredExpenses.filter(expense => (
      new Date(expense.spentAt) < new Date(to)
    ));
  }

  return filtredExpenses;
}

function findExpenseById(expenseId) {
  const foundExpense = expenses.find(expense => expense.id === expenseId);

  return foundExpense;
}

function deleteExpense(expenseId) {
  expenses = expenses.filter(expense => expense.id !== expenseId);
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
    id: new Date().getTime(),
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

module.exports = {
  getAllByQuery,
  findExpenseById,
  deleteExpense,
  createExpense,
  clearExpenses,
};
