'use strict';

const { unicId } = require('../helpers/helpers');

const currentDate = new Date();

let expenses = [];

const getAll = () => {
  return expenses;
};

const getById = (id) => {
  const foundExpenses = expenses.find(expens => expens.id === Number(id));

  return foundExpenses || null;
};

const create = ({ userId, amount, category, note }) => {
  const id = unicId();

  const newExpenses = {
    id,
    userId,
    spentAt: currentDate.toISOString(),
    amount,
    category,
    note,
  };

  expenses.push(newExpenses);

  return newExpenses;
};

const remove = (id) => {
  expenses = expenses.filter(expens => expens.id !== id);
};

const update = (body, id) => {
  const foundUser = getById(id);

  Object.assign(foundUser, body);

  return foundUser;
};

module.exports = {
  getAll, getById, create, remove, update,
};
