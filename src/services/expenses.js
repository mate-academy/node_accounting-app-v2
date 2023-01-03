'use strict';

let expenses = [];

function getAll() {
  return expenses;
}

function findExpenseById(expenseId) {
  const foundExpense = expenses
    .find(expense => expense.id === Number(expenseId));

  return foundExpense || null;
}

function addOne(body) {
  const maxID = Math.max(...expenses.map(expense => expense.id));
  const newExpense = {
    id: maxID > 0 ? (maxID + 1) : 1,
    ...body,
  };

  expenses.push(newExpense);

  return newExpense;
}

function updateOne(foundExpense, newParams) {
  Object.assign(foundExpense, newParams);

  return foundExpense;
}

function deleteOne(expenseId) {
  const filteredExpenses = expenses
    .filter(expense => expense.id !== Number(expenseId));

  expenses = filteredExpenses;
}

module.exports.expensesService = {
  getAll,
  findExpenseById,
  addOne,
  updateOne,
  deleteOne,
};
