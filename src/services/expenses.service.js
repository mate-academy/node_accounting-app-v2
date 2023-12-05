'use strict';

let expenses = [];

const resetExpenses = () => {
  expenses = [];
};

const getAll = () => {
  return expenses;
};

const getById = (id) => {
  return expenses.find(e => e.id === +id) || null;
};

const create = (expenseData) => {
  const newExpense = {
    id: new Date().getTime(),
    ...expenseData,
  };

  expenses.push(newExpense);

  return newExpense;
};

const update = (id, ...dataToUpdate) => {
  const expense = getById(id);

  Object.assign(expense, { ...dataToUpdate });

  return expense;
};

const remove = (id) => {
  expenses = expenses.filter(e => e.id !== +id);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  resetExpenses,
};
