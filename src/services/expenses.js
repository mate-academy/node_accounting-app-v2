'use strict';

function findNewId() {
  return Math.max(...expenses.map(user => user.id), 0) + 1;
}

let expenses = [];

const clearExpenses = () => {
  expenses = [];
};

const getMany = (getQuery) => {
  const { userId, category, from, to } = getQuery;

  if (!expenses.length) {
    return [];
  }

  let filteredExpenses = expenses;

  if (userId) {
    filteredExpenses = filteredExpenses
      .filter(expense => expense.userId === +userId);
  }

  if (category) {
    filteredExpenses = filteredExpenses
      .filter(expense => expense.category === category);
  }

  if (from) {
    filteredExpenses = filteredExpenses
      .filter(expense => expense.spentAt >= from);
  }

  if (to) {
    filteredExpenses = filteredExpenses
      .filter(expense => expense.spentAt <= to);
  }

  return filteredExpenses;
};

const getOne = (id) => {
  return expenses.find(expense => expense.id === +id) || null;
};

const add = (newExpenseBody) => {
  const newExpense = {
    ...newExpenseBody,
    id: findNewId(),
  };

  expenses.push(newExpense);

  return newExpense;
};

const remove = (id) => {
  expenses = expenses.filter(expense => expense.id !== +id);
};

const update = ({ id, fieldsForUpdate }) => {
  const expense = getOne(id);

  Object.assign(expense, { ...fieldsForUpdate });

  return expense;
};

module.exports = {
  getMany, add, getOne, remove, update, clearExpenses,
};
