'use strict';

const expenses = [];

function createExpense(name, amount) {
  const newExpense = {
    id: expenses.length + 1,
    name,
    amount,
  };

  expenses.push(newExpense);

  return newExpense;
}

function getAllExpenses() {
  return expenses;
}

function getExpenseById(id) {
  return expenses.find((e) => e.id === parseInt(id));
}

function updateExpense(id, name, amount) {
  const expense = expenses.find((e) => e.id === parseInt(id));

  if (!expense) {
    return null;
  }

  expense.name = name;
  expense.amount = amount;

  return expense;
}

function deleteExpense(id) {
  const index = expenses.findIndex((e) => e.id === parseInt(id));

  if (index === -1) {
    return false;
  }

  expenses.splice(index, 1);

  return true;
}

module.exports = {
  createExpense,
  getAllExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
};
