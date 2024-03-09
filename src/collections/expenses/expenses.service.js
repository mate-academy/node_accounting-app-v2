'use strict';

let expenses = [];

function clearAll() {
  expenses = [];
}

function getAll(userId, categories = [], from, to) {
  let filtExp = expenses;

  if (userId !== undefined) {
    filtExp = filtExp.filter(expense => expense.userId === userId);
  }

  if (categories.length) {
    filtExp = filtExp.filter(expense => categories.includes(expense.category));
  }

  if (from instanceof Date && to instanceof Date) {
    filtExp = filtExp.filter(expense => {
      const spentAt = new Date(expense.spentAt);

      return spentAt >= from && spentAt <= to;
    });
  }

  return filtExp;
}

function getOne(id) {
  return expenses.find(expense => expense.id === id);
}

function add(expense) {
  const id = Math.max(...expenses.map(e => e.id), -1) + 1;
  const newExpense = { ...expense, id };

  expenses.push(newExpense);

  return newExpense;
}

function remove(id) {
  const expenseIndex = expenses.findIndex(expense => expense.id === id);

  if (expenseIndex === -1) {
    return false;
  }

  expenses.splice(expenseIndex, 1);

  return true;
}

function update(expenseToUpdate) {
  const expenseIndex = expenses.findIndex(exp => exp.id === expenseToUpdate.id);

  if (expenseIndex === -1) {
    return null;
  }

  for (const key in expenseToUpdate) {
    if (expenseToUpdate[key] === undefined) {
      delete expenseToUpdate[key];
    }
  }

  const updatedExpense = { ...expenses[expenseIndex], ...expenseToUpdate };

  expenses.splice(expenseIndex, 1, {
    ...expenses[expenseIndex], ...expenseToUpdate,
  });

  return updatedExpense;
}

module.exports = { getAll, getOne, add, remove, update, clearAll };
