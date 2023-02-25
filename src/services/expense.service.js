'use strict';

let expenses = [];

const getInitial = () => {
  expenses = [];
};

const getAll = () => expenses;

const create = (options) => {
  const maxId = expenses.length
    ? Math.max(...expenses.map(({ id }) => id))
    : 0;

  const newExpense = {
    id: maxId + 1,
    ...options,
  };

  expenses.push(newExpense);

  return newExpense;
};

const findById = (expenseId) => {
  const foundExpense = expenses.find(e => e.id === expenseId);

  return foundExpense || null;
};

const getAllForUser = (userId) => {
  const foundExpenses = expenses.filter(e => e.userId === userId);

  return foundExpenses;
};

const getAllBetweenDates = (from, to) => {
  const parsedFromDate = Date.parse(from);
  const parsedToDate = Date.parse(to);

  const foundExpenses = expenses.filter(e => {
    const parsedExpense = Date.parse(e.spentAt);

    return parsedExpense >= parsedFromDate && parsedExpense <= parsedToDate;
  });

  return foundExpenses;
};

const getAllByCategory = (category) => {
  const foundExpenses = expenses.filter(e => e.category === category);

  return foundExpenses;
};

const remove = (expenseId) => {
  expenses = expenses.filter(e => e.id !== expenseId);
};

const update = (
  expenseId,
  options,
) => {
  const expense = findById(expenseId);

  Object.assign(expense, options);

  return expense;
};

module.exports = {
  expenseService: {
    getInitial,
    getAll,
    create,
    findById,
    getAllForUser,
    getAllBetweenDates,
    getAllByCategory,
    remove,
    update,
  },
};
