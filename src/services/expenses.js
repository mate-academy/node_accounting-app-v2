'use strict';

let expenses = [];
let largestId = 0;

function setInitialValue() {
  expenses = [];
  largestId = 0;
};

function getAll({
  userId,
  category,
  from,
  to,
}) {
  return expenses.filter(expense => {
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
  });
};

function getById(expenseId) {
  const foundExpense = expenses.find(expense => expense.id === +expenseId);

  return foundExpense || null;
};

function create(expenseData) {
  largestId++;

  const newExpense = {
    id: largestId,
    ...expenseData,
  };

  expenses.push(newExpense);

  return newExpense;
};

function remove(expenseId) {
  expenses = expenses.filter(expense => expense.id !== +expenseId);
};

function update({ id, title }) {
  const expense = getById(id);

  Object.assign(expense, { title });

  return expense;
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
  setInitialValue,
};
