'use strict';

let expenses = [];

const getInitial = () => {
  expenses = [];
};

const getAll = (userId, from, to, category) => {
  if (!userId && !from && !to && !category) {
    return expenses;
  };

  return expenses.filter(e => {
    const isFilteredByUser = userId
      ? e.userId === userId
      : true;

    const isFilteredByDates = from && to
      ? getAllBetweenDates(from, to).includes(e)
      : true;

    const isFilteredByCategory = category
      ? e.category === category
      : true;

    return isFilteredByUser && isFilteredByDates && isFilteredByCategory;
  });
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
    getAllBetweenDates,
    remove,
    update,
  },
};
