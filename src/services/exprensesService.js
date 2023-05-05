'use strict';

const { v4: uuidv4 } = require('uuid');

let expenses = [];

function getAllExpenses() {
  return expenses;
};

function addExpense(obj) {
  const newExpense = {
    id: uuidv4(),
    ...obj,
  };

  expenses.push(newExpense);

  return newExpense;
}

function getExpense(id) {
  return expenses.filter((el) => el.userId === id);
}

function deleteExpense(id) {
  expenses = expenses.filter((el) => el.id !== id);
}

function updateExpense(id, obj) {
  expenses = expenses.map((el) => {
    if (el.userId === id) {
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
