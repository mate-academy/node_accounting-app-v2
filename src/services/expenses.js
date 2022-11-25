'use strict';

const userServices = require('./users');

let expenses = [];

function getAllFiltered(query) {
  const { userId, category } = query;

  const filteredExpenses = expenses;

  return filteredExpenses.filter((expense) => {
    if (userId) {
      return expense.userId === +userId;
    }

    if (category) {
      return expense.category === category;
    }
  });
}

function getById(expenseId) {
  const foundedExpense = expenses.find((expense) => {
    return expense.id === +expenseId;
  });

  return foundedExpense || null;
}

function create({ userId, spentAt, title, amount, category, note }) {
  const currentUser = userServices.users.find((user) => user.id === +userId);

  const newExpense = {
    id: +new Date(),
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  return {
    newExpense: newExpense,
    currentUser: currentUser,
  };
}

function remove(expenseId) {
  expenses = expenses.filter((expense) => expense.id !== +expenseId);
}

function update({ foundExpense, title }) {
  Object.assign(foundExpense, { title });

  return foundExpense;
}

module.exports = {
  getAllFiltered,
  getById,
  create,
  remove,
  update,
  expenses,
};
