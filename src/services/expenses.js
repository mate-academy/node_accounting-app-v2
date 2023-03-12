'use strict';

const { addUniqueId } = require('../utils/addUniqueId');

let expenses = [];

const resetExpenses = () => {
  expenses = [];
};

const getExpenses = ({ userId, categories, from, to }) => {
  const filteredExpenses = expenses.filter(expense => {
    const hasUserId = userId
      ? +userId === expense.id
      : true;

    const hasCategories = categories
      ? categories.includes(expense.category)
      : true;

    const hasFrom = from
      ? expense.spentAt > from
      : true;

    const hasTo = to
      ? expense.spentAt < to
      : true;

    return hasUserId
      && hasCategories
      && hasFrom
      && hasTo;
  });

  return filteredExpenses;
};

const getExpenseById = (expenseId) => {
  const foundExpense = expenses.find(expense => (
    expense.id === +expenseId
  ));

  return foundExpense || null;
};

const createExpense = (expense) => {
  const newExpense = {
    ...expense,
    id: addUniqueId(expenses),
  };

  expenses.push(newExpense);

  return newExpense;
};

const removeExpense = (expenseId) => {
  expenses = expenses.filter(expense => +expenseId !== expense.id);
};

const updateExpsense = (expenseId, newData) => {
  const expenseToUpdate = getExpenseById(expenseId);

  Object.assign(expenseToUpdate, { ...newData });

  return expenseToUpdate;
};

module.exports = {
  resetExpenses,
  getExpenses,
  getExpenseById,
  createExpense,
  removeExpense,
  updateExpsense,
};
