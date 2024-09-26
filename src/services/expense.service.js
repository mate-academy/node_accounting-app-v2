'use strict';

let expenses = [];

const getAll = () => {
  return expenses;
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
  getById,
  create,
  update,
  deleteExpense,
  deleteAllExpenses,
};
