'use strict';

let expenses = [];

function getAllfilterExpenses(filters) {
  let filteredExpenses = expenses;
  const { userId, categories, from, to } = filters;

  if (userId) {
    filteredExpenses = filteredExpenses
      .filter(expense => expense.userId === +userId);
  }

  if (categories) {
    filteredExpenses = filteredExpenses.filter(expense => (
      categories.includes(expense.category)
    ));
  }

  if (from && to) {
    filteredExpenses = filteredExpenses.filter(expense => {
      const expanseDate = new Date(expense.spentAt);
      const fromDate = new Date(from);
      const toDate = new Date(to);

      return fromDate <= expanseDate && toDate > expanseDate;
    });
  }

  return filteredExpenses;
}

function getById(expenseId) {
  const foundExpense = expenses.find(expense => expense.id === +expenseId);

  return foundExpense || null;
}

function create(data) {
  const newExpense = {
    id: expenses.length + 1,
    ...data,
  };

  expenses.push(newExpense);

  return newExpense;
}

function remove(expenseId) {
  expenses = expenses.filter(expense => expense.id !== +expenseId);
}

function update({ id, data }) {
  const expense = getById(id);

  Object.assign(expense, data);

  return expense;
}

function reset() {
  expenses = [];
}

module.exports = {
  getAllfilterExpenses,
  getById,
  create,
  remove,
  update,
  reset,
};
