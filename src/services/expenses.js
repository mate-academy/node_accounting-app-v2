'use strict';

let expenses = [];
let idCounter = 0;

function setInitialValue() {
  expenses = [];
  idCounter = 0;
}

function getAll({ userId, category, from, to }) {
  return expenses.filter(expense => {
    const isUserMatch = userId
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

    return isUserMatch && isCategoryMatch && isFromMatch && isToMatch;
  });
}

function getById(expenseId) {
  const foundexpense = expenses.find(
    expense => expense.id === +expenseId
  ) || null;

  return foundexpense || null;
}

function create(expenseData) {
  idCounter++;

  const preparedexpense = {
    id: idCounter,
    ...expenseData,
  };

  expenses.push(preparedexpense);

  return preparedexpense;
}

function remove(expenseId) {
  const filtredExpenses = expenses.filter(expense => expense.id !== +expenseId);

  expenses = filtredExpenses;
}

function update({ id, ...dataToUpdate }) {
  const expenseToUpdate = getById(id);

  Object.assign(expenseToUpdate, { ...dataToUpdate });

  return expenseToUpdate;
};

module.exports = {
  setInitialValue,
  getAll,
  getById,
  create,
  remove,
  update,
};
