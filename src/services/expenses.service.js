'use strict';

const { idGenerator } = require('../utils/idGenerator');

let expenses = [];

const getAll = () => {
  return expenses;
};

const getById = (id) => {
  return expenses.find(expense => expense.id === id) || null;
};

const add = (expense) => {
  const preparedExpense = {
    id: idGenerator(expenses),
    ...expense,
  };

  expenses.push(preparedExpense);

  return preparedExpense;
};

const update = (id, expense) => {
  const expenseToUpdate = expenses.find(user => user.id === id);

  if (!expenseToUpdate) {
    return;
  }

  Object.assign(expenseToUpdate, { ...expense });

  return expenseToUpdate;
};

const remove = (id) => {
  const isExpenseExists = expenses.some(item => item.id === id);

  if (!isExpenseExists) {
    return false;
  }

  expenses = expenses.filter(item => item.id !== id);

  return true;
};

const removeAll = () => {
  expenses = [];
};

module.exports = {
  getAll,
  getById,
  add,
  update,
  remove,
  removeAll,
};
