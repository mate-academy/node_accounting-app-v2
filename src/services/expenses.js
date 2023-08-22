'use strict';

const { getNewId } = require('../utils');

let expenses = [];

function getFiltered(userIdStr, dateFromStr, dateToStr, categories) {
  let filteredExpenses = [...expenses];

  if (userIdStr) {
    const userId = +userIdStr;

    filteredExpenses = filteredExpenses.filter(
      expense => expense.userId === userId
    );
  }

  if (dateFromStr) {
    const dateFrom = new Date(dateFromStr);

    filteredExpenses = filteredExpenses.filter(expense => {
      const expenseDate = new Date(expense.spentAt);

      return expenseDate >= dateFrom;
    });
  }

  if (dateToStr) {
    const dateTo = new Date(dateToStr);

    filteredExpenses = filteredExpenses.filter(expense => {
      const expenseDate = new Date(expense.spentAt);

      return expenseDate <= dateTo;
    });
  }

  if (categories) {
    filteredExpenses = filteredExpenses.filter(
      expense => expense.category === categories
    );
  }

  return filteredExpenses;
}

function getById(expenseId) {
  const foundExpense = expenses.find(
    expense => expense.id === expenseId
  );

  return foundExpense;
}

function create(data) {
  const newExpense = {
    id: getNewId(expenses),
    ...data,
  };

  expenses.push(newExpense);

  return newExpense;
}

function update(expenseId, data) {
  const expense = getById(expenseId);

  Object.assign(expense, data);

  return expense;
}

function remove(expenseId) {
  expenses = expenses.filter(expense => expense.id !== expenseId);
}

function removeAll() {
  expenses = [];
};

module.exports = {
  getFiltered, getById, create, update, remove, removeAll,
};
