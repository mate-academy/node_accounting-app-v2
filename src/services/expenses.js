'use strict';

let expenses = [];

function setEmptyExpenses() {
  expenses = [];
}

function getAll() {
  return expenses;
}

function filterAllByUserId(userId) {
  return expenses.filter(
    expense => expense.userId === +userId,
  );
}

function filterAllByDate(from, to) {
  return expenses.filter(expense => {
    const currentDate = expense.spentAt;

    return currentDate.valueOf() >= from.valueOf()
      && currentDate.valueOf() <= to.valueOf();
  });
}

function filterAllByCategory(category) {
  return expenses.filter(
    expense => expense.category === category,
  );
}

function getById(expensesId) {
  const foundExpense = expenses.find(expense => expense.id === +expensesId);

  return foundExpense || null;
}

function create(body) {
  const newId = Math.max(...expenses.map(({ id }) => id), 0) + 1;

  const newExpenses = {
    id: newId,
    ...body,
  };

  expenses.push(newExpenses);

  return newExpenses;
}

function remove(expensesId) {
  expenses = expenses.filter(expense => expense.id !== +expensesId);
}

function update(expensesId, body) {
  const foundExpense = getById(expensesId);

  Object.assign(foundExpense, body);

  return foundExpense;
}

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
  setEmptyExpenses,
  filterAllByCategory,
  filterAllByDate,
  filterAllByUserId,
};
