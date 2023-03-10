'use strict';

let expenses = [];

function getEmptyExpenses() {
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
  const start = Date.parse(from);
  const end = Date.parse(to);

  return expenses.filter(expense => {
    const currentDate = Date.parse(expense.spentAt);

    return currentDate.valueOf() >= start.valueOf()
      && currentDate.valueOf() <= end.valueOf();
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
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = body;

  const dataIsValid = typeof spentAt === 'string'
    || typeof title === 'string'
    || typeof amount === 'number'
    || typeof category === 'string'
    || typeof note === 'string';

  if (!dataIsValid) {
    throw new Error('Data is not valid');
  }

  const newId = Math.max(...expenses.map(({ id }) => id), 0) + 1;

  const newExpenses = {
    id: newId,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
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
  getEmptyExpenses,
  filterAllByCategory,
  filterAllByDate,
  filterAllByUserId,
};
