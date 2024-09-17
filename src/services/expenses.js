'use strict';

let expenses = [];

function getAllExpenses() {
  return expenses;
}

function getExpenseById(expenseId) {
  const foundExpense = expenses.find(expense => expense.id === expenseId);

  return foundExpense || null;
}

function addExpense(
  userId,
  spentAt,
  title,
  amount,
  category,
  note
) {
  const newId = expenses.length
    ? Math.max(...expenses.map(expense => expense.id)) + 1
    : 1;

  const newExpense = {
    id: newId,
    userId: +userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(newExpense);

  return newExpense;
}

function deleteExpense(expenseId) {
  expenses = expenses.filter(expense => expense.id !== expenseId);
}

module.exports = {
  getAllExpenses,
  getExpenseById,
  addExpense,
  deleteExpense,
};
