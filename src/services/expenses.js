'use strict';

let expenses = [];

function getAll() {
  return expenses;
}

function findById(expensesId) {
  return expenses.find(({ id }) => Number(expensesId) === id);
}

function create(data) {
  const newExpense = {
    id: expenses.length + 1,
    ...data,
  };

  expenses.push(newExpense);

  return newExpense;
}

function update(expensesId, body) {
  const expense = findById(expensesId);

  if (expense) {
    Object.assign(expense, body);
  }

  return expense;
}

function remove(expensesId) {
  expenses = expenses.filter(({ id }) => Number(expensesId) !== id);
}

function clearExpenses() {
  expenses = [];
}

module.exports = {
  getAll,
  findById,
  create,
  update,
  remove,
  clearExpenses,
};
