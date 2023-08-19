'use strict';

const expenses = [];

const getAll = (params) => {
  const {
    userId,
    categories,
    from,
    to,
  } = params;

  let expensesToReturn = expenses;

  if (userId) {
    expensesToReturn = expensesToReturn
      .filter((expense) => expense.userId === parseInt(userId));
  }

  if (categories) {
    expensesToReturn = expensesToReturn
      .filter((expense) => categories.includes(expense.category));
  }

  if (from) {
    expensesToReturn = expensesToReturn
      .filter((expense) => expense.spentAt >= from);
  }

  if (to) {
    expensesToReturn = expensesToReturn
      .filter((expense) => expense.spentAt <= to);
  }

  return expensesToReturn;
};

const getOne = (id) => {
  return expenses.find((expense) => expense.id === id);
};

const add = (expense) => {
  const newExpense = {
    id: Date.now(), ...expense,
  };

  expenses.push(newExpense);

  return newExpense;
};

const update = (id, expenseData) => {
  const expense = expenses
    .find((expenseToFind) => expenseToFind.id === id);

  if (!expense) {
    return null;
  }

  Object.assign(expense, expenseData);

  return expense;
};

const remove = (id) => {
  const startLength = expenses.length;

  expenses.splice(expenses.findIndex((expense) => expense.id === id), 1);

  return startLength !== expenses.length;
};

const clearDatabase = () => {
  expenses.length = 0;
};

module.exports = {
  getAll,
  getOne,
  add,
  update,
  remove,
  clearDatabase,
};
