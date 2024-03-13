/* eslint-disable no-console */
'use strict';

const expenses = [];

const getExpenses = ({ userId, categories, from, to }) => {
  return expenses.filter(expense => {
    const isUserMatch = userId
      ? expense.userId === +userId
      : true;

    const isCategoryMatch = categories
      ? expense.category === categories
      : true;

    const isFromMatch = from
      ? expense.spentAt >= from
      : true;

    const isToMatch = to
      ? expense.spentAt <= to
      : true;

    return isUserMatch && isCategoryMatch && isFromMatch && isToMatch;
  });
};

const createExpenses = (userId, spentAt, title, amount, category, note, id) => {
  const expense = {
    id: expenses.length + 1,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(expense);

  return expense;
};

const getExpenseById = (id) => {
  return expenses.find(e => e.id === +id);
};

const deleteExpense = (id) => {
  const user = getExpenseById(id);

  expenses.splice(expenses.findIndex(item => item.id === id), 1);

  return user;
};

const updateExpense = (body, id) => {
  const expense = getExpenseById(id);

  if (!expense) {
    return null;
  }

  return Object.assign(expense, {
    ...expense,
    ...body,
  });
};

const setInitialExpense = () => {
  expenses.length = 0;
};

module.exports = {
  getExpenses,
  createExpenses,
  getExpenseById,
  deleteExpense,
  updateExpense,
  setInitialExpense,
};
