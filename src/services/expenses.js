'use strict';

const { generateId } = require('../helpers');

let expenses = [];

function getAll(params) {
  const {
    userId,
    categories,
    from,
    to,
  } = params;

  let newExpenses = [ ...expenses ];

  if (userId) {
    newExpenses = newExpenses.filter(
      expense => expense.userId === +userId
    );
  }

  if (from) {
    const dateFrom = new Date(from);

    newExpenses = newExpenses.filter(expense => {
      const expenseDate = new Date(expense.spentAt);

      return expenseDate >= dateFrom;
    });
  }

  if (to) {
    const dateTo = new Date(to);

    newExpenses = newExpenses.filter(expense => {
      const expenseDate = new Date(expense.spentAt);

      return expenseDate <= dateTo;
    });
  }

  if (categories) {
    newExpenses = newExpenses.filter(
      expense => expense.category === categories
    );
  }

  return newExpenses;
};

function create(body) {
  const newExpense = {
    id: generateId(expenses),
    ...body,
  };

  expenses.push(newExpense);

  return newExpense;
};

function getById(expenseId) {
  const foundExpense = expenses.find(expense => expense.id === expenseId);

  return foundExpense || null;
};

function remove(expenseId) {
  expenses = expenses.filter(expense => expense.id !== expenseId);
};

function update(id, expenseBody) {
  const expense = getById(id);

  Object.assign(expense, expenseBody);

  return expense;
};

function removeAll() {
  expenses = [];
};

module.exports = {
  getAll,
  create,
  getById,
  remove,
  update,
  removeAll,
};
