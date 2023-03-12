'use strict';

let expenses = [];

function getAll(userId = null, from = null, to = null, category = null) {
  let filteredExpenses = expenses;

  if (userId) {
    filteredExpenses = filteredExpenses
      .filter(expense => expense.userId === userId);
  }

  if (from && to) {
    filteredExpenses = filteredExpenses
      .filter(expense => expense.spentAt >= from && expense.spentAt <= to);
  }

  if (category) {
    filteredExpenses = filteredExpenses
      .filter(expense => expense.category === category);
  }

  return filteredExpenses;
}

function getOne(expenseId) {
  return expenses.find(expense => expense.id === expenseId);
}

function addOne(
  userId,
  spentAt,
  title,
  amount,
  category,
  note = ''
) {
  const newExpenseId = expenses.length
    ? expenses.reduce((max, expense) => Math.max(max, expense.id), 0) + 1
    : 1;

  const newExpense = {
    id: newExpenseId,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(newExpense);

  return newExpense;
}

function deleteOne(expenseId) {
  const filteredExpenses = expenses.filter(expense => expense.id !== expenseId);

  if (filteredExpenses.length === expenses.length) {
    return false;
  }

  expenses = filteredExpenses;

  return true;
}

function updateOne(expenseId, expenseToUpdate) {
  const foundExpense = getOne(expenseId);

  Object.assign(
    foundExpense,
    ...Object.entries(expenseToUpdate).map(
      ([k, v]) => v === undefined ? {} : { [k]: v }
    ),
  );

  return foundExpense;
}

function reset() {
  expenses = [];
}

module.exports = {
  getAll,
  getOne,
  addOne,
  deleteOne,
  updateOne,
  reset,
};
