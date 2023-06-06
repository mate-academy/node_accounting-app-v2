'use strict';

let expenses = [];

function getFiltered(data) {
  const { userId, categories, from, to } = data;

  if (userId) {
    expenses = expenses.filter(expense => Number(userId) === expense.userId);
  }

  if (categories) {
    expenses = expenses.filter(expense => expense.category === categories);
  }

  if (from && to) {
    expenses = expenses.filter(({ spentAt }) => (
      spentAt >= from && spentAt <= to
    ));
  }

  return expenses;
}

function getById(expenseId) {
  const foundExpense = expenses.find((expense) =>
    expense.id === Number(expenseId)
  );

  return foundExpense || null;
}

function create(data) {
  const newId = Math.max(expenses.map(({ id }) => id)) + 1;

  const newExpense = {
    id: newId,
    ...data,
  };

  expenses.push(newExpense);

  return newExpense;
}

function update({ id, ...data }) {
  const expense = getById(id);

  Object.assign(expense, data);

  return expense;
}

function remove(expenseId) {
  expenses = expenses.filter(
    expense => expense.id !== Number(expenseId)
  );
}

function reset() {
  expenses = [];
};

module.exports = {
  getFiltered,
  getById,
  create,
  update,
  remove,
  reset,
};
