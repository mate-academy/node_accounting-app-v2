/* eslint-disable max-len */
'use strict';

let expenses = [];

const getAll = () => {
  return expenses;
};

const getOne = (id) => {
  return expenses.find(expense => expense.id === +id) || null;
};

const create = ({
  userId, spentAt, title, amount, category, note,
}) => {
  const newExpense = {
    id: expenses.length + 1,
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
  expenses = expenses.filter(expense => expense.id !== +id);
};

const update = (id, body) => {
  const expense = getOne(id);

  Object.assign(expense, body);
};

const clearExpenses = () => {
  expenses = [];
};

module.exports = {
  getAll,
  getOne,
  create,
  clearExpenses,
  remove,
  update,
};
