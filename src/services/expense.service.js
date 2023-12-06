'use strict';

let expenses = [];
let expId = 1;

const generateExpId = () => {
  const newId = expId;

  expId++;

  return newId;
};

const getAll = () => {
  return expenses;
};

const getFiltered = (userId, categories, fromDate, toDate) => {
  return expenses.filter(ex => {
    const byUser = !userId || ex.userId.toString() === userId.toString();
    const byCategory = !categories || categories.includes(ex.category);
    const byFromDate = !fromDate || new Date(ex.spentAt) >= new Date(fromDate);
    const byToDate = !toDate || new Date(ex.spentAt) <= new Date(toDate);

    return byUser && byCategory && byFromDate && byToDate;
  });
};

const getById = (id) => {
  return expenses.find(ex => ex.id === Number(id)) || null;
};

const create = (userId, spentAt, title, amount, category, note) => {
  const newExpense = {
    id: generateExpId(),
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(newExpense);

  return newExpense;
};

const update = (id, updates) => {
  const expense = getById(id);

  Object.assign(expense, updates);

  return expense;
};

const remove = (id) => {
  const newExpenses = expenses.filter(ex => ex.id !== id);

  expenses = newExpenses;
};

const reset = () => {
  expenses = [];
};

module.exports = {
  getAll,
  getFiltered,
  getById,
  create,
  update,
  remove,
  reset,
};
