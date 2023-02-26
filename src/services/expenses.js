'use strict';

const { createId } = require('../helpers/createId');

let expenses = [];

const setInitialExpenses = () => {
  expenses = [];
};

const getAll = ({
  userId,
  category,
  from,
  to,
}) => {
  return expenses.filter(expense => {
    const isUserIdMatch = userId
      ? expense.userId === +userId
      : true;

    const isCategoryMatch = category
      ? expense.category === category
      : true;

    const isDateFromMatch = from
      ? expense.spentAt >= from
      : true;

    const isDateToMatch = to
      ? expense.spentAt <= to
      : true;

    return isUserIdMatch && isCategoryMatch && isDateFromMatch && isDateToMatch;
  });
};

const findById = (expenseId) => {
  const findExpense = expenses.find(expense => expense.id === +expenseId);

  return findExpense || null;
};

const create = (expenseData) => {
  const newExpense = {
    id: createId(expenses),
    ...expenseData,
  };

  expenses.push(newExpense);

  return newExpense;
};

const update = (expenseId, expenseData) => {
  const expenseToUpdate = findById(expenseId);

  Object.assign(expenseToUpdate, { ...expenseData });

  return expenseToUpdate;
};

const remove = (expenseId) => {
  expenses = expenses.filter(expense => expense.id !== +expenseId);
};

module.exports = {
  getAll,
  findById,
  create,
  update,
  remove,
  setInitialExpenses,
};
