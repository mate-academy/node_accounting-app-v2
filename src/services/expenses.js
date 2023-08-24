'use strict';

let expenses = [];

function getExpensesPrepared(userId, from, to, categories) {
  let preparedExpenses = [...expenses];

  if (userId) {
    preparedExpenses = preparedExpenses
      .filter(expense => expense.userId === +userId);
  }

  if (from) {
    const fromDate = new Date(from);

    preparedExpenses = preparedExpenses.filter(expense =>
      new Date(expense.spentAt) > fromDate
    );
  }

  if (to) {
    const toDate = new Date(to);

    preparedExpenses = preparedExpenses.filter(expense =>
      new Date(expense.spentAt) < toDate
    );
  }

  if (categories) {
    preparedExpenses = preparedExpenses
      .filter(expense => expense.category === categories);
  }

  return preparedExpenses;
};

function addExpense(userId, spentAt, title, amount, category, note) {
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

function getExpenseById(expenseId) {
  return expenses.find(expense => expense.id === expenseId);
};

function deleteExpense(expenseId) {
  const filteredExpenses = expenses.filter(expense => expense.id !== expenseId);

  expenses = filteredExpenses;

  return expenses;
};

function updateExpense({
  expenseId, userId, spentAt, title, amount, category, note,
}) {
  const updatedExpense = getExpenseById(expenseId);

  Object.assign(updatedExpense, {
    userId, spentAt, title, amount, category, note,
  });

  return updatedExpense;
};

function removeAllExpenses() {
  expenses.length = 0;
};

module.exports = {
  getExpensesPrepared,
  addExpense,
  getExpenseById,
  deleteExpense,
  updateExpense,
  removeAllExpenses,
};
