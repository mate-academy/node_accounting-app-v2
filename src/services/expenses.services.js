'use strict';

let expenses = [];

const getAll = () => {
  return expenses;
};

const getById = (id) => {
  return expenses.find(expense => expense.id === id) || null;
};

const create = (id, userId, spentAt, title, amount, category, note) => {
  const newExpense = {
    id,
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

const remove = (id) => {
  expenses = expenses.filter(expense => expense.id !== id);
};

const update = (id, newFields) => {
  const expense = getById(id);

  Object.assign(expense, newFields);

  return expense;
};

const clearAll = () => {
  expenses.splice(0, expenses.length);
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
  clearAll,
};
