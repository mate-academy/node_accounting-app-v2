'use strict';

let expenses = [];

function getAll(
  userId = null,
  category = null,
  from = null,
  to = null
) {
  let visibleExpenses = expenses;

  if (userId) {
    visibleExpenses = visibleExpenses
      .filter(expense => expense.userId === Number(userId));
  }

  if (category) {
    visibleExpenses = visibleExpenses
      .filter(expense => expense.category === category);
  }

  if (from) {
    visibleExpenses = visibleExpenses
      .filter(expense => expense.spentAt > from);
  }

  if (to) {
    visibleExpenses = visibleExpenses
      .filter(expense => expense.spentAt < to);
  }

  return visibleExpenses;
}

function findExpenseById(expenseId) {
  const foundExpense = expenses
    .find(expense => expense.id === Number(expenseId));

  return foundExpense || null;
}

function addOne(body) {
  const maxID = Math.max(...expenses.map(expense => expense.id));
  const newExpense = {
    id: maxID > 0 ? (maxID + 1) : 1,
    ...body,
  };

  expenses.push(newExpense);

  return newExpense;
}

function updateOne(foundExpense, newParams) {
  Object.assign(foundExpense, newParams);

  return foundExpense;
}

function deleteOne(expenseId) {
  const filteredExpenses = expenses
    .filter(expense => expense.id !== Number(expenseId));

  expenses = filteredExpenses;
}

module.exports.expensesService = {
  getAll,
  findExpenseById,
  addOne,
  updateOne,
  deleteOne,
};
