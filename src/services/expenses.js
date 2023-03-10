'use strict';

let expenses = [];
let id = 0;

const getAll = ({ userId, category, from, to }) => {
  if (!expenses.length) {
    return [];
  }

  return expenses.filter(expense => {
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
};

const create = (params) => {
  const newExpense = {
    id: id++,
    ...params,
  };

  expenses.push(newExpense);

  return newExpense;
};

const findById = (expenseId) => {
  const foundExpense = expenses.find(expense => expense.id === +expenseId);

  return foundExpense || null;
};

const remove = (userId) => {
  const initialLength = expenses.length;

  expenses = expenses.filter(user => user.id !== +userId);

  const finalLength = expenses.length;

  return finalLength < initialLength;
};

const update = (expenseId, params) => {
  const expense = findById(expenseId);

  Object.assign(expense, params);

  return expense;
};

const clear = () => {
  expenses = [];
};

module.exports = {
  getAll, create, findById, remove, update, clear,
};
