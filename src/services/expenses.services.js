'use strict';

let expensesFromServer = [];

const findAll = () => expensesFromServer;

const getById = (id) => (
  expensesFromServer.find(e => e.id === id) || null
);

const createOne = ({
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

const deleteOne = (id) => {
  expensesFromServer = expensesFromServer.filter(e => e.id !== id);
};

const updateOne = (title, expenses) => {
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
  createOne,
  deleteOne,
  updateOne,
  setAll,
  clearExpenses,
};
