'use strict';

const expenses = [];

const getAll = () => {
  return expenses;
};

const getById = (id) => {
  return expenses.find(user => user.id === +id) || null;
};

const create = (userId, spentAt, title, amount, category, note) => {
  const id = Math.max(expenses.map(expenseId => +expenseId.id)) + 1;

  const newExpenses = {
    id,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(newExpenses);

  return newExpenses;
};

const remove = (id) => {
  expenses.filter(
    consumption => consumption.userId !== +id
  );
};

const update = (id, spentAt, title, amount, category, note) => {
  const userExpenses = getById(id);

  const newUser = {
    ...userExpenses,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  return newUser;
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
