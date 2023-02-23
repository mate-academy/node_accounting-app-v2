'use strict';

let expenses = [];

function emptyExpenses() {
  expenses = [];

  return expenses;
}

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

function getById(expenseId) {
  const foundExpense = expenses.find(
    expense => expense.id === Number(expenseId)
  );

  return foundExpense || null;
}

function create(expenseData) {
  const maxId = expenses.length
    ? Math.max(...expenses.map(user => user.id)) + 1
    : 0;

  const newExpense = {
    ...expenseData,
    id: maxId,
  };

  expenses.push(newExpense);

  return newExpense;
}

function remove(expenseId) {
  expenses = expenses.filter(expense => expense.id !== +expenseId);
}

function update(expenseId, expenseInfo) {
  const expense = getById(expenseId);

  Object.assign(expense, { ...expenseInfo });
}

module.exports = {
  emptyExpenses,
  getAll,
  getById,
  create,
  remove,
  update,
};
