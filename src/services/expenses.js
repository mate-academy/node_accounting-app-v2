'use strict';

let expenses = [];

function getAll(data) {
  const { userId, categories, from, to } = data;

  let filteredExpenses = expenses;

  if (userId) {
    filteredExpenses = filteredExpenses.filter(
      (elem) => elem.userId === +userId);
  }

  if (categories) {
    filteredExpenses = filteredExpenses.filter(
      (elem) => elem.category === categories);
  }

  if (from && to) {
    const fromDate = new Date(from);
    const toDate = new Date(to);

    filteredExpenses = filteredExpenses.filter(({ spentAt }) => {
      const expanseDate = new Date(spentAt);

      return fromDate <= expanseDate && toDate > expanseDate;
    });
  }

  return filteredExpenses;
}

function findById(expensesId) {
  return expenses.find(({ id }) => Number(expensesId) === id);
}

function create(data) {
  const newExpense = {
    id: expenses.length + 1,
    ...data,
  };

  expenses.push(newExpense);

  return newExpense;
}

function update(expensesId, body) {
  const expense = findById(expensesId);

  if (expense) {
    Object.assign(expense, body);
  }

  return expense;
}

function remove(expensesId) {
  expenses = expenses.filter(({ id }) => Number(expensesId) !== id);
}

function clearExpenses() {
  expenses = [];
}

module.exports = {
  getAll,
  findById,
  create,
  update,
  remove,
  clearExpenses,
};
