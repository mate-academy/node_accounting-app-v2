'use strict';

const { getLargestId } = require('../utils/getLargestId');
let expenses = [];

const setInitial = () => {
  expenses = [];
};

const getAll = ({
  userId,
  category,
  from,
  to,
}) => expenses.filter(expense => {
  const isUserIdMatch = userId
    ? expense.userId === +userId
    : true;

  const isCategoryMatch = category
    ? expense.category === category
    : true;

  const isFromMatch = from
    ? expense.spentAt >= from
    : true;

  const isToMatch = to
    ? expense.spentAt <= to
    : true;

  return isUserIdMatch && isCategoryMatch && isFromMatch && isToMatch;
});

const getExpenseById = (expenseId) => {
  return expenses.find(expense => expense.id === +expenseId);
};

const createExpense = (expense) => {
  const newExpense = {
    id: getLargestId(expenses) + 1,
    ...expense,
  };

  expenses.push(newExpense);

  return newExpense;
};

const deleteExpense = (expenseId) => {
  expenses = expenses.filter(expense => expense.id !== +expenseId);
};

module.exports = {
  setInitial,
  getAll,
  getExpenseById,
  createExpense,
  deleteExpense,
};
