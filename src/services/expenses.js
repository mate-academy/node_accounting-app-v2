'use strict';

const { getNewId } = require('../utils/getNewId');

let expenses = [];

const filterExpenses = (filters) => {
  const { userId, categories, from, to } = filters;

  let tempExpenses = [...expenses];

  if (userId) {
    tempExpenses = tempExpenses.filter(expense => (
      String(expense.userId) === userId
    ));
  }

  if (categories) {
    tempExpenses = tempExpenses.filter(expense => (
      categories.includes(expense.category)
    ));
  }

  if (from && to) {
    tempExpenses = tempExpenses.filter(expense => {
      const periodStart = new Date(from);
      const periodEnd = new Date(to);
      const checkDate = new Date(expense.spentAt);

      return (checkDate >= periodStart) && (checkDate <= periodEnd);
    });
  }

  return tempExpenses;
};

const getExpenseById = (expenseId) => {
  const foundExpense = expenses.find(
    expense => String(expense.id) === expenseId
  );

  return foundExpense || null;
};

const createExpense = (body) => {
  const id = getNewId(expenses);
  const expense = {
    id,
    ...body,
  };

  expenses.push(expense);

  return expense;
};

const updateExpense = (expenseId, body) => {
  const expense = getExpenseById(expenseId);

  if (expense) {
    Object.assign(expense, body);
  }

  return expense;
};

const removeExpense = (expenseId) => {
  expenses = expenses.filter(({ id }) => (
    String(id) !== expenseId
  ));
};

const clearExpenses = () => {
  expenses = [];
};

module.exports = {
  filterExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  removeExpense,
  clearExpenses,
};
