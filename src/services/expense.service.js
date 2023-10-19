'use strict';

let expenses = [
  // {
  //   id: 1,
  //   userId: 2,
  //   spentAt: new Date().toString(),
  //   title: 'TV',
  //   amount: 2000,
  //   category: 'RTV',
  //   note: 'new TV',
  // },
  // {
  //   id: 2,
  //   userId: 3,
  //   spentAt: new Date().toString(),
  //   title: 'Bread',
  //   amount: 5,
  //   category: 'Food',
  //   note: 'food',
  // },
  // {
  //   id: 3,
  //   userId: 1,
  //   spentAt: new Date().toString(),
  //   title: 'Shampoo',
  //   amount: 25,
  //   category: 'Chemistry',
  //   note: 'chemistry',
  // },
];

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
