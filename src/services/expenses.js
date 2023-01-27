'use strict';

let expenses = [];

function resetState() {
  expenses = [];
}

function getAll() {
  return expenses;
}

function getBy(id) {
  return expenses.find(expense => expense.id === +id);
}

function filterBy(filter) {
  const userIdPredicate = (expense) => {
    return filter.userId == null || expense.userId === +filter.userId;
  };
  const categoryPredicate = (expense) => {
    return filter.category == null || expense.category === filter.category;
  };
  const dateFromPredicate = (expense) => {
    return filter.from == null
      || Date.parse(expense.spentAt) >= Date.parse(filter.from);
  };
  const dateToPredicate = (expense) => {
    return filter.from == null
      || Date.parse(expense.spentAt) <= Date.parse(filter.to);
  };

  return expenses
    .filter(userIdPredicate)
    .filter(categoryPredicate)
    .filter(dateFromPredicate)
    .filter(dateToPredicate);
}

function create(expenseObj) {
  const id = expenses.length > 0
    ? (Math.max(...expenses.map(expense => +expense.id)) + 1)
    : 1;

  const newExpense = {
    id,
    ...expenseObj,
  };

  expenses.push(newExpense);

  return newExpense;
}

function remove(id) {
  expenses = expenses.filter(expense => expense.id !== +id);
}

function update({ id, expenseObj }) {
  const expense = getBy(id);

  Object.assign(expense, expenseObj);

  return expense;
}

module.exports = {
  resetState,
  getAll,
  getBy,
  filterBy,
  create,
  remove,
  update,
};
