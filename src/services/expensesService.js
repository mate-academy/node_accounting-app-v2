'use strict';

const expenses = [];

const init = () => {
  expenses.length = 0;
};

const getFilteredExpenses = (searchParams) => {
  let filteredExpenses = expenses;

  const { userId, categories, from, to } = searchParams;
  const fromDate = new Date(from);
  const toDate = new Date(to);

  filteredExpenses = filteredExpenses.filter(
    (expense) =>
      (!userId || expense.userId === +userId) &&
      (!categories || expense.category === categories) &&
      (!from ||
        !to ||
        (fromDate <= new Date(expense.spentAt) &&
          toDate >= new Date(expense.spentAt))),
  );

  return filteredExpenses;
};

const getExpenseById = (id) => {
  return expenses.find((expense) => expense.id === +id);
};

const addExpense = (data) => {
  const createdExpense = {
    id: expenses.length + 1,
    ...data,
  };

  expenses.push(createdExpense);

  return createdExpense;
};

const updateExpense = (choosedExpense, data) => {
  return Object.assign(choosedExpense, data);
};

const deleteExpense = (id) => {
  const foundedIndex = expenses.findIndex((expense) => expense.id === +id);

  if (foundedIndex > -1) {
    expenses.splice(foundedIndex, 1);

    return true;
  }

  return false;
};

module.exports = {
  init,
  getFilteredExpenses,
  getExpenseById,
  addExpense,
  updateExpense,
  deleteExpense,
};
