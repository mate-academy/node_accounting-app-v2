'use strict';

let expensesFromServer = [];

const findAll = () => expensesFromServer;

const getById = (id) => (
  expensesFromServer.find(expense => expense.id === id) || null
);

const create = ({
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
}) => {
  const expenses = {
    id: expensesFromServer.length,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expensesFromServer.push(expenses);

  return expenses;
};

const remove = (id) => {
  expensesFromServer = expensesFromServer.filter(expense => expense.id !== id);
};

const update = (title, expenses) => {
  Object.assign(expenses, { title });

  return expenses;
};

const setAll = (newExpenses) => {
  expensesFromServer = newExpenses;
};

const clearExpenses = () => {
  expensesFromServer = [];
};

module.exports = {
  findAll,
  getById,
  create,
  remove,
  update,
  setAll,
  clearExpenses,
};
