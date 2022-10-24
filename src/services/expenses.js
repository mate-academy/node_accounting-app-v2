'use strict';

let expenses = [];

function getAll() {
  return expenses;
}

function getById(expenseId) {
  const foundExpense = expenses.find(({ id }) => id === Number(expenseId));

  return foundExpense || null;
}

function create(
  title,
  amount,
  category,
  note,
  userId
) {
  let newExpense = {
    userId,
    spentAt: new Date(),
    title,
    category,
    amount,
    note,
  };

  if (expenses.length === 0) {
    newExpense = {
      id: 1,
      ...newExpense,
    };
  } else {
    newExpense = {
      id: Math.max(...expenses.map(({ id }) => id)) + 1,
      ...newExpense,
    };
  }

  expenses.push(newExpense);

  return newExpense;
}

function remove(expenseId) {
  expenses = expenses.filter(({ id }) => id !== Number(expenseId));
}

function update({
  expenseId,
  title,
  amount,
  category,
  note,
}) {
  const expense = getById(expenseId);

  Object.assign(expense, {
    title,
    amount,
    category,
    note,
  });

  return expense;
}

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
