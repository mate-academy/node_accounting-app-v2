'use strict';

const { v4: uuidv4 } = require('uuid');

let expenses = [];

function getAll(querry) {
  return expenses;
};

function getById(expensId) {
  const foundExpens = expenses.find(expens => expens.id === expensId);

  return foundExpens || null;
};

function create(expens) {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = expens;

  const newExpens = {
    id: uuidv4(),
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(newExpens);
}

function remove(expensId) {
  expenses = expenses.filter(expens => expens.id !== expensId);
}

module.exports = {
  getAll,
  getById,
  create,
  remove,
};
