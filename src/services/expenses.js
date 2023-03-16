'use strict';

const { getNewId } = require('./helper');

let expenses = [];

function getAll({ userId, category, from, to }) {
  return expenses.length
    ? expenses.filter(expense => {
      const isUserIdMatch = userId
        ? expense.userId === +userId
        : true;

      const isCategoryMatch = category
        ? expense.category === category
        : true;

      const isFromMatch = from
        ? expense.spentAt >= from
        : true;

      const isToMatch = to
        ? expense.spentAt <= to
        : true;

      return isUserIdMatch && isCategoryMatch && isFromMatch && isToMatch;
    })
    : [];
}

function findById(expenseId) {
  const foundExpense = expenses.find(
    expense => expense.id === Number(expenseId)
  );

  return foundExpense || null;
}

function create(expenseData) {
  const newExpense = {
    id: getNewId(expenses),
    ...expenseData,
  };

  expenses.push(newExpense);

  return newExpense;
}

function remove(expenseId) {
  expenses = expenses.filter(expense => expense.id !== +expenseId);
}

function update(expenseId, expenseInfo) {
  const expense = findById(expenseId);

  Object.assign(expense, { ...expenseInfo });
}

function reset() {
  expenses = [];
};

module.exports = {
  getAll,
  findById,
  create,
  remove,
  update,
  reset,
};
