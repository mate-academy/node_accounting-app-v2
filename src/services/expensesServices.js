'use strict';

const { uniqueExpenseId } = require('../helpers/helpers');

let expenses = [];

const getAll = () => {
  return expenses;
};

const getById = (id) => {
  const foundExpenses = expenses.find(expens => expens.id === Number(id));

  return foundExpenses || null;
};

const create = ({ userId, amount, category, note, title, spentAt }) => {
  const id = uniqueExpenseId('expenses');

  const newExpenses = {
    id,
    userId,
    title,
    spentAt,
    amount,
    category,
    note,
  };

  expenses.push(newExpenses);

  return newExpenses;
};

const remove = (id) => {
  expenses = expenses.filter(expens => expens.id !== Number(id));
};

const update = (body, id) => {
  const foundUser = getById(id);

  return Object.assign(foundUser, body);
};

module.exports = {
  getAll, getById, create, remove, update,
};
