'use strict';

let expenses = [];

function clearAll() {
  expenses = [];
}

function getAll(params = {}) {
  let filteredExpenses = [...expenses];

  if (params.userId) {
    filteredExpenses = filteredExpenses.filter(expense => (
      expense.userId === +params.userId
    ));
  }

  if (params.from && params.to) {
    filteredExpenses = filteredExpenses.filter(expense => {
      const expenseDate = new Date(expense.spentAt).getTime();
      const dateFrom = new Date(params.from).getTime();
      const dateTo = new Date(params.to).getTime();

      if (dateFrom <= expenseDate && dateTo >= expenseDate) {
        return true;
      }

      return false;
    });
  }

  if (params.categories) {
    filteredExpenses = filteredExpenses.filter(expense => (
      expense.category === params.categories
    ));
  }

  return filteredExpenses;
}

function getById(expenseId) {
  const foundExpenses = expenses.find(expense => (
    expense.id === +expenseId
  )) || null;

  return foundExpenses;
}

function remove(expenseId) {
  const filteredExpenses = expenses.filter(expense =>
    (expense.id !== +expenseId));

  return filteredExpenses;
}

function setFilteredExpenses(filteredExpenses) {
  expenses = [...filteredExpenses];
}

function create({ userId, title, amount, category, note, spentAt }) {
  const newExpens = {
    id: +new Date(),
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(newExpens);

  return newExpens;
}

module.exports = {
  getAll, getById, remove, create, setFilteredExpenses, clearAll,
};
