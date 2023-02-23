'use strict';

const { generateId } = require('../helpers/generateId');

let expenses = [];

const clearExpenses = () => {
  expenses = [];
};

function getAll(query) {
  const { userId, category, from, to } = query;

  let filteredExpenses = expenses;

  if (!filteredExpenses.length) {
    return [];
  }

  filteredExpenses = filteredExpenses.filter((expense) => {
    const userIdMatches = !userId || expense.userId === Number(userId);
    const categoryMatches = !category || category.includes(expense.category);
    const fromMatches = !from || expense.spentAt >= from;
    const toMatches = !to || expense.spentAt <= to;

    return userIdMatches && categoryMatches && fromMatches && toMatches;
  });

  return filteredExpenses;
}

function findById(expenseId) {
  const foundExpense = expenses.find(expense => (
    expense.id === Number(expenseId)
  ));

  return foundExpense || null;
}

function create(expenseData) {
  const newId = generateId(expenses);

  const newExpense = {
    id: newId,
    ...expenseData,
  };

  expenses.push(newExpense);

  return newExpense;
};

function remove(expenseId) {
  const initialLength = expenses.length;

  expenses = expenses.filter(expense => expense.id !== Number(expenseId));

  const finalLength = expenses.length;

  return finalLength < initialLength;
}

function update({ expenseId, title }) {
  const expense = findById(expenseId);

  Object.assign(expense, { title });

  return expense;
}

module.exports = {
  getAll,
  findById,
  create,
  remove,
  update,
  clearExpenses,
};
