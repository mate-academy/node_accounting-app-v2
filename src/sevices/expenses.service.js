'use strict';

let expenses = [];

const getAll = () => {
  return expenses;
};

const getById = (id) => {
  return expenses.find(expense => expense.id === +id) || null;
};

const create = ({ userId, amount, category, note, title, spentAt }) => {
  const newExpense = {
    id: new Date().getTime(),
    userId,
    title,
    spentAt,
    amount,
    category,
    note,
  };

  expenses.push(newExpense);

  return newExpense;
};

const update = (id, body) => {
  const expense = getById(id);

  Object.assign(expense, body);

  return expense;
};

const remove = (id) => {
  expenses = expenses.filter(user => user.id !== +id);
};

const clear = () => {
  expenses = [];
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  clear,
};
