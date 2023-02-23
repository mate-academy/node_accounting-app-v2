'use strict';

let expenses = [];

function getNewId() {
  if (!expenses.length) {
    return 1;
  }

  return Math.max(...expenses.map(user => user.id)) + 1;
};

function getAll(userId, category, from, to) {
  let filteredExpenses = [...expenses];

  if (category) {
    filteredExpenses = filteredExpenses
      .filter(expense => expense.category === category);

    return filteredExpenses;
  }

  if (userId) {
    filteredExpenses = filteredExpenses.filter(expense =>
      (expense.userId === +userId));
  }

  if (from && to) {
    filteredExpenses = filteredExpenses
      .filter(expense => expense.spentAt >= from && expense.spentAt <= to);

    return filteredExpenses;
  }
};

function findById(expenseId) {
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
};

function update({ title, id }) {
  const expense = findById(id);

  Object.assign(expense, { title });

  return expense;
}

function reset() {
  expenses = [];
};

module.exports = {
  getAll,
  findById,
  create,
  remove,
  update,
  reset,
};
