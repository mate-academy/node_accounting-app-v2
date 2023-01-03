'use strict';

let expenses = [];

function getNewId() {
  const maxId = Math.max(...expenses.map(el => el.id));

  if (maxId) {
    return 1;
  }

  return maxId + 1;
}

function init() {
  expenses = [];
};

function getByQuery(
  userId,
  category,
  from,
  to,
) {
  let expensesToShow = expenses;

  if (userId) {
    expensesToShow = [expensesToShow
      .find(exp => exp.userId === Number(userId))];
  }

  if (category) {
    expensesToShow = expensesToShow
      .filter(exp => exp.category === category);
  }

  if (from) {
    expensesToShow = expensesToShow
      .filter(exp => exp.spentAt >= from);
  }

  if (to) {
    expensesToShow = expensesToShow
      .filter(exp => exp.spentAt <= to);
  }

  return expensesToShow;
}

function getOne(expenseId) {
  return expenses
    .find(expense => expense.id === Number(expenseId));
}

function create(query) {
  const newExpense = {
    id: getNewId(expenses),
    ...query,
  };

  expenses.push(newExpense);

  return newExpense;
}

function remove(expenseId) {
  expenses = expenses.filter(exp => exp.id !== Number(expenseId));
}

function update(foundExp, body) {
  Object.assign(foundExp, body);
}

module.exports = {
  init,
  getByQuery,
  getOne,
  create,
  remove,
  update,
};
