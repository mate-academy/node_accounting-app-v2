'use strict';

let users = [];

let expenses = [];

export function getUsers() {
  return users;
}

export function getExpenses() {
  return expenses;
}

export function getUserById(userId) {
  const selectedUser = users.find(user => user.id === +userId)

  return selectedUser || null;
}

export function getExpenceById(expenceId) {
  const selectedExpense = expenses.find(expense => expense.id === +expenceId)

  return selectedExpense || null;
}

export function getExpencesByUserId(userId) {
  const selectedExpenses = expenses.filter(expense => expense.userId === +userId)

  return selectedExpenses;
}

export function createUser(name) {
  const newUser = {
    id: users.length + 1,
    name,
  }

  users.push(newUser);

  return newUser;
}

export function createExpence({
  userId,
  spentAt,
  title,
  amount,
  category,
  note
}) {
  const newExpense = {
    id: expenses.length + 1,
    userId,
    spentAt,
    title,
    amount,
    category,
    note
  }

  expenses.push(newExpense);

  return newExpense;
}

export function removeUser(userId) {
  users = users.filter(user => user.id !== +userId);
}

export function removeExpense(expenceId) {
  expenses = expenses.filter(expense => expense.id !== +expenceId);
}

export function amendUser({
  id,
  name,
}) {
  const selectedUser = getUserById(id);

  Object.assign(selectedUser, { name })

  return selectedUser;
}

export function amendExpense({
  id,
  spentAt,
  title,
  amount,
  category,
  note
}) {
  const selectedExpense = getExpenceById(id);

  Object.assign(selectedExpense, {
    spentAt,
    title,
    amount,
    category,
    note
  })

  return selectedExpense;
}
