'use strict';

const users = [];
const expenses = [];

function getUsers() {
  return users;
}

function getUserById(userId) {
  return users.find(user => user.id === +userId);
}

function createUser(name) {
  const newUser = {
    id: Math.random(),
    name,
  };

  users.push(newUser);

  return newUser;
}

function getExpenses() {
  return expenses;
}

function getExpenseById(expenseId) {
  return expenses.find(expense => expense.id === +expenseId);
}

function createExpense(userId, spentAt, title, amount, category, note) {
  const hasUser = users.map(user => user.id).includes(userId);
  const hasAllData = userId && title && amount && category && note;

  if (!hasUser || !hasAllData) {
    return null;
  }

  const newExpense = {
    id: Math.random(),
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
  getUsers,
  getUserById,
  createUser,
  getExpenses,
  getExpenseById,
  createExpense,
};
