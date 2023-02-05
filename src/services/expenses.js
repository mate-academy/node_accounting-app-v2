'use strict';

let expenses = [];

function getNewId() {
  if (!expenses.length) {
    return 1;
  }

  return Math.max(...expenses.map(user => user.id)) + 1;
}

function getAll(userId, category, from, to) {
  let processedExpenses = [...expenses];

  if (userId) {
    processedExpenses = processedExpenses.filter(
      expense => expense.id === +userId
    );
  }

  if (category) {
    processedExpenses = processedExpenses.filter(
      expense => expense.category === category
    );
  }

  if (from && to) {
    processedExpenses = processedExpenses.filter(
      expense => (expense.spentAt >= from && expense.spentAt <= to)
    );
  }

  return processedExpenses;
};

function getById(expenseId) {
  const foundExpense = expenses.find(expense => expense.id === +expenseId);

  return foundExpense || null;
};

function create(expense) {
  const newExpense = {
    id: getNewId(),
    ...expense,
  };

  expenses.push(newExpense);

  return newExpense;
}

function remove(expenseId) {
  expenses = expenses.filter(expense => expense.id !== +expenseId);
}

function update(expenseId, expense) {
  const updateExpense = getById(expenseId);

  Object.assign(updateExpense, expense);

  return updateExpense;
}

function reset() {
  expenses = [];
}

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
  reset,
};
