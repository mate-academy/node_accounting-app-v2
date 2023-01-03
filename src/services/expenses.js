'use strict';

let expenses = [];

function init() {
  expenses = [];
};

function getAll(userId, category, from, to) {
  if (category) {
    const filteredExpenses = expenses
      .filter(expense => expense.category === category);

    return filteredExpenses;
  }

  if (from && to) {
    const filteredExpenses = expenses
      .filter(expense =>
        expense.spentAt >= from && expense.spentAt <= to,
      );

    return filteredExpenses;
  }

  if (userId) {
    const foundUser = expenses
      .filter(expense => expense.userId === +userId);

    return foundUser;
  }

  return expenses;
};

function getbyId(expenseId) {
  const foundExpense = expenses.find(expense => expense.id === +expenseId);

  return foundExpense || null;
}

function create(userId, spentAt, title, amount, category, note) {
  const newExpense = {
    id: expenses.length + 1,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(newExpense);

  return newExpense;
};

function remove(expenseId) {
  const filteredExpenses = expenses
    .filter(expense => expense.id !== +expenseId);

  expenses = filteredExpenses;
};

function update(expenseId, title) {
  const foundExpense = getbyId(expenseId);

  const updatedExpense = Object.assign(foundExpense, { title });

  return updatedExpense;
};

module.exports = {
  init,
  getAll,
  getbyId,
  create,
  remove,
  update,
};
