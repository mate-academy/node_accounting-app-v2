'use strict';

let expenses = [];

const reset = () => {
  expenses = [];
};

const getAll = () => expenses;

const getAllFilteredExpenses
  = (userId = '', categories = '', from = '', to = '') => {
    let expensesToShow = expenses;

    if (userId) {
      expensesToShow = expensesToShow
        .filter(expense => expense.userId === +userId);
    }

    if (categories) {
      expensesToShow = expensesToShow
        .filter(expense => categories.includes(expense.category));
    }

    if (from) {
      expensesToShow = expensesToShow
        .filter(expense => expense.spentAt > from && expense.spentAt < to);
    }

    if (to) {
      expensesToShow = expensesToShow
        .filter(expense => expense.spentAt < to);
    }

    return expensesToShow;
  };

const getById = (expenseId) => {
  const foundExpense = expenses.find(expense => expense.id === +expenseId);

  return foundExpense || null;
};

const add = (body) => {
  const maxId = Math.max(...expenses.map(expense => expense.id), 0);

  const newExpense = {
    id: maxId + 1,
    ...body,
  };

  expenses.push(newExpense);

  return newExpense;
};

const remove = (expenseId) => {
  expenses = expenses.filter(expense => expense.id !== +expenseId);
};

const update = (expenseId, body) => {
  const foundExpense = getById(expenseId);

  Object.assign(foundExpense, body);

  return foundExpense;
};

module.exports.expensesService = {
  reset,
  getAll,
  getAllFilteredExpenses,
  getById,
  add,
  remove,
  update,
};
