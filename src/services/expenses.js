'use strict';

let expenses = [];

function getAllExpenses() {
  return expenses;
}

function findExpensesById(expensesId) {
  return expenses.find(({ id }) => +expensesId === id);
}

function createExpense(data) {
  const newExpense = {
    id: expenses.length + 1,
    ...data,
  };

  expenses.push(newExpense);

  return newExpense;
}

function updateExpense(expensesId, body) {
  const expense = findExpensesById(expensesId);

  if (expense) {
    Object.assign(expense, body);
  }

  return expense;
}

function deleteExpense(expensesId) {
  expenses = expenses.filter(({ id }) => +expensesId !== id);
}

function clearExpanses() {
  expenses = [];
}

module.exports = {
  getAllExpenses,
  findExpensesById,
  createExpense,
  updateExpense,
  deleteExpense,
  clearExpanses,
};
