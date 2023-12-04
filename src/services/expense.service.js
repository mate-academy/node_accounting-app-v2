'use strict';

const createNewId = require('./../helpers/createNewId');

let expenses = [];

const expenseService = {
  getAll: () => expenses,
  getById: (id) => expenses.find((expense) => expense.id === id) || null,
  delete: (id) => (expenses = expenses.filter((expense) => expense.id !== id)),

  create: (expense) => {
    const newExpense = {
      id: createNewId(expenses),
      ...expense,
    };

    expenses.push(newExpense);

    return newExpense;
  },

  update: (id, fields) => {
    const expense = expenseService.getById(id) || null;

    if (!expense) {
      return expense;
    }

    Object.assign(expense, fields);

    return expense;
  },

  clear: () => {
    expenses = [];
  },
};

module.exports = expenseService;
