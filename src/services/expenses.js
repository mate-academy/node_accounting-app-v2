'use strict';

const { createId } = require('../utils/createId');

let expenses = [];

const getAll = () => {
  return expenses;
};

const getAllByUserId = (userId) => {
  return expenses.filter(expense => (
    expense.userId === +userId
  ));
};

const getAllByCategory = (category) => {
  return expenses.filter(expense => (
    expense.category === category
  ));
};

const getAllByTimeFrame = (from, to) => {
  const fromDate = Date.parse(from);
  const toDate = Date.parse(to);

  return expenses.filter(expense => {
    const spentDate = Date.parse(expense.spentAt);

    return fromDate <= spentDate && spentDate <= toDate;
  });
};

const getOne = (expenseId) => {
  return expenses.find(({ id }) => id === +expenseId);
};

const add = (params) => {
  const newExpense = {
    id: createId(expenses),
    ...params,
  };

  expenses = [...expenses, newExpense];

  return newExpense;
};

const remove = (expenseId) => {
  expenses = expenses.filter(({ id }) => id !== +expenseId);
};

const update = (expenseId, params, requestedExpense) => {
  const updatedExpense = {
    ...requestedExpense,
    ...params,
  };

  expenses = expenses.map((expense) => (
    expense.id === +expenseId ? updatedExpense : expense
  ));

  return updatedExpense;
};

module.exports = {
  getAll,
  getAllByUserId,
  getAllByCategory,
  getAllByTimeFrame,
  getOne,
  add,
  remove,
  update,

};
