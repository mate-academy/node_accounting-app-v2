'use strict';

let expenses = [];

function clearAllExpenses() {
  expenses = [];
}

function getAllExpenses() {
  return expenses;
}

function getExpenseById(id) {
  return expenses.find(exp => exp.id === id);
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
    id: expenses.length,
    userId,
    title,
    amount,
    category,
    note,
    spentAt,
  };

  expenses.push(newExpense);

  return newExpense;
}

function deleteExpenseById(id) {
  return expenses.filter(exp => exp.id !== id);
}

function setAllExpenses(newExpenses) {
  expenses = newExpenses;
}

function updateExpense(expense, title) {
  Object.assign(expense, { title });
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
