'use strict';

let expanses = [];
let idsExpansesCounter = 0;

function setDefaultExpanses() {
  expanses = [];
  idsExpansesCounter = 0;
}

function create(userData) {
  idsExpansesCounter++;

  const newExpanse = {
    id: idsExpansesCounter,
    ...userData,
  };

  expanses.push(newExpanse);

  return newExpanse;
}

function getAll({ userId, category, from, to }) {
  return expanses.filter((expense) => {
    const isUserIdMatch = userId ? expense.userId === +userId : true;

    const isCategoryMatch = category ? expense.category === category : true;

    const isFromMatch = from ? expense.spentAt >= from : true;

    const isToMatch = to ? expense.spentAt <= to : true;

    return isUserIdMatch && isCategoryMatch && isFromMatch && isToMatch;
  });
}

function getById(expenseId) {
  const foundExpense = expanses.find((expense) => expense.id === +expenseId);

  return foundExpense;
}

function update(expenseId, receivedData) {
  const foundExpense = getById(expenseId);

  Object.assign(foundExpense, { ...receivedData });
}

function remove(expenseId) {
  expanses = expanses.filter((expense) => expense.id !== +expenseId);
}

module.exports = {
  setDefaultExpanses,
  create,
  getAll,
  getById,
  update,
  remove,
};
