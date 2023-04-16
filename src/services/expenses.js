'use strict';

let expenses = [];

const init = () => {
  expenses = [];
};

const getAll = (query) => {
  const { userId, categories, from, to } = query;

  return expenses.filter(expense => {
    const userIdMatch = userId
      ? +expense.userId === +userId
      : true;

    const categoriesMatch = categories
      ? categories.includes(expense.category)
      : true;

    const datesMatch = (from && to)
      ? expense.spentAt >= from && expense.spentAt <= to
      : true;

    return userIdMatch && categoriesMatch && datesMatch;
  });
};

const getById = (expenseId) => {
  const expense = expenses.find(({ id }) => +id === +expenseId);

  return expense;
};

const create = (data) => {
  const maxId = Math.max(expenses.map(({ id }) => id), 0);

  const newExpense = {
    id: maxId + 1,
    ...data,
  };

  expenses.push(newExpense);

  return newExpense;
};

const update = (expenseId, data) => {
  const expense = getById(expenseId);

  Object.assign(expense, data);
};

const remove = (expenseId) => {
  expenses = expenses.filter(({ id }) => +id !== +expenseId);
};

module.exports = {
  init,
  getAll,
  getById,
  create,
  update,
  remove,
};
