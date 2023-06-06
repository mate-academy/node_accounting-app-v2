'use strict';

let expenses = [];

function getAllExpenses() {
  return expenses;
}

function findExpensesById(expensesId) {
  return expenses.find(({ id }) => id === expensesId);
}

function createExpense(dataExpense) {
  const newExpenseId = expenses.length + 1;

  const newExpense = {
    id: newExpenseId,
    ...dataExpense,
  };

  expenses.push(newExpense);

  return newExpense;
}

function removeExpense(expensesId) {
  expenses = expenses.filter(({ id }) => id !== +expensesId);

  return expenses;
}

function updateExpense(expenseId, bodyExpense) {
  const expense = findExpensesById(+expenseId);

  if (expense) {
    Object.assign(expense, bodyExpense);
  }

  return expense;
}

module.exports = {
  getAllExpenses,
  findExpensesById,
  createExpense,
  removeExpense,
  updateExpense,
};
