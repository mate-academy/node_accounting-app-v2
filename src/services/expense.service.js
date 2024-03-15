'use strict';

const expenses = [];
let increment = 1;

function clearAllExpenses() {
  expenses.length = 0;
}

function getAllExpenses() {
  return expenses;
}

function getExpenseById(id) {
  return expenses.find(item => item.id === id);
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
    id: increment,
    userId,
    title,
    amount,
    category,
    note,
    spentAt,
  };

  expenses.push(newExpense);
  increment++;

  return newExpense;
}

function deleteExpenseById(id) {
  const filteredExpenses = expenses.filter(item => item.id !== id);

  return filteredExpenses;
}

function setAllExpenses(newExpenses) {
  expenses.length = 0;
  expenses.push(...newExpenses);
}

function updateExpense(expense, title) {
  return Object.assign(expense, { ...title });
}

module.exports = {
  clearAllExpenses,
  getAllExpenses,
  getExpenseById,
  createExpense,
  deleteExpenseById,
  setAllExpenses,
  updateExpense,
};
