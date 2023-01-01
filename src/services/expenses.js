'use strict';

let expenses = [];

const getAll = (query, url) => {
  let filteredExpenses = expenses;

  if (url) {
    const dateFrom = url.split('&')[1];
    const dateTo = url.split('&')[2];
    const paramsFrom = new URLSearchParams(dateFrom);
    const paramsTo = new URLSearchParams(dateTo);

    const fromDate = paramsFrom.get('from');
    const toDate = paramsTo.get('to');

    filteredExpenses = filteredExpenses.filter(
      expense => expense.spentAt > fromDate && expense.spentAt < toDate
    );

    return filteredExpenses;
  }

  for (const key in query) {
    filteredExpenses = filteredExpenses.filter(
      expense => String(expense[key]) === query[key]
    );
  }

  return filteredExpenses;
};

const addOne = (params) => {
  const newId = expenses.length
    ? Math.max(...expenses.map(expense => expense.id)) + 1
    : 1;

  const newExpenses = {
    id: newId,
    ...params,
  };

  expenses.push(newExpenses);

  return newExpenses;
};

const getOne = (expenseId) => {
  const foundExpense = expenses.find(
    expense => expense.id === Number(expenseId)
  );

  return foundExpense;
};

const deleteOne = (expenseId) => {
  expenses = expenses.filter(expense => expense.id !== Number(expenseId));
};

const updateOne = (foundExpense, newParams) => {
  Object.assign(foundExpense, newParams);
};

module.exports = {
  getAll,
  addOne,
  getOne,
  deleteOne,
  updateOne,
};
