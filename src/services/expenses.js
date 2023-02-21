'use strict';

function createNewId() {
  return Math.max(...expenses.map(expense => expense.id), 0) + 1;
}

let expenses = [];

function setInitial() {
  expenses = [];
}

function getAll(searchParams) {
  const { userId, category, from, to } = searchParams;

  return expenses.filter(expense => {
    const isUserIdMatch = userId
      ? expense.userId === +userId
      : true;

    const isCategoriesMatch = category
      ? expense.category === category
      : true;

    const isFromMatch = from
      ? expense.spentAt >= from
      : true;

    const isToMatch = to
      ? expense.spentAt <= to
      : true;

    return isUserIdMatch && isCategoriesMatch && isFromMatch && isToMatch;
  });
};

function getById(expenseId) {
  const foundExpense = expenses.find(expense => expense.id === +expenseId);

  return foundExpense || null;
};

function create(expenseData) {
  const newExpense = {
    id: createNewId(),
    ...expenseData,
  };

  expenses.push(newExpense);

  return newExpense;
};

function remove(expenseId) {
  expenses = expenses.filter(expense => expense.id !== +expenseId);
};

function update(expenseId, dataToUpdate) {
  const foundExpense = getById(expenseId);

  const updatedExpense = Object.assign(foundExpense, dataToUpdate);

  return updatedExpense;
}

module.exports = {
  setInitial,
  getAll,
  getById,
  create,
  remove,
  update,
};
