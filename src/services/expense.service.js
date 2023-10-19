'use strict';

let expenses = [];

const getAll = () => {
  return expenses;
};

const getAllByUserId = (queryUserId, filteredExpenses) => {
  return filteredExpenses.filter(({ userId }) => userId === queryUserId);
};

const getAllByCategory = (queryCategory, filteredExpenses) => {
  return filteredExpenses.filter(({ category }) => category.toLowerCase()
    === queryCategory.toLowerCase());
};

const getAllByDateFrom = (queryFrom, filteredExpenses) => {
  return filteredExpenses.filter(({ spentAt }) => new Date(spentAt).valueOf()
    >= new Date(queryFrom).valueOf());
};

const getAllByDateTo = (queryTo, filteredExpenses) => {
  return filteredExpenses.filter(({ spentAt }) => new Date(spentAt).valueOf()
    <= new Date(queryTo).valueOf());
};

const getById = (expenseId) => {
  return expenses.find(({ id }) => id === expenseId) || null;
};

const create = (data) => {
  const expense = {
    id: +new Date(),
    ...data,
  };

  expenses.push(expense);

  return expense;
};

const update = (
  id,
  data,
) => {
  const expense = getById(id);

  Object.assign(
    expense,
    data,
  );

  return expense;
};

const deleteExpense = (expenseId) => {
  expenses = expenses.filter(({ id }) => id !== expenseId) || null;
};

const deleteAllExpenses = () => {
  expenses.length = 0;
};

module.exports = {
  getAll,
  getAllByUserId,
  getAllByCategory,
  getAllByDateFrom,
  getAllByDateTo,
  getById,
  create,
  update,
  deleteExpense,
  deleteAllExpenses,
};
