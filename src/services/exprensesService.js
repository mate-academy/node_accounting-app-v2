'use strict';

const { v4: uuidv4 } = require('uuid');
const { getAll } = require('../services/usersServer');

let expenses = [];

getAll().forEach((el, index) => {
  const date = new Date();

  expenses.push({
    id: uuidv4(),
    userId: el.id,
    spentAt: new Date(date.getTime() + index * 10000),
    title: 'Test',
    amount: 10000,
    category: 'salary',
    note: '',
  });
});

function getAllExpenses() {
  return expenses;
};

function addExpense(obj) {
  expenses.push(
    {
      id: uuidv4(),
      spentAt: new Date(),
      ...obj,
    }
  );
}

function getExpense(id) {
  return expenses.find((el) => el.id === id);
}

function deleteExpense(id) {
  expenses = expenses.filter((el) => el.id !== id);
}

function updateExpense(id, obj) {
  expenses = expenses.map((el) => {
    if (el.id === id) {
      return {
        ...el,
        ...obj,
      };
    }

    return el;
  });
}

module.exports = {
  getAllExpenses,
  addExpense,
  getExpense,
  deleteExpense,
  updateExpense,
};
