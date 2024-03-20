'use strict';

const expenses = [];

const init = () => {
  expenses.length = 0;
};

const getFilteredExpenses = (searchParams) => {
  let filteredExpenses = expenses;

  const { userId, categories, from, to } = searchParams;

  if (userId) {
    filteredExpenses = filteredExpenses.filter(
      (expense) => expense.userId === +userId,
    );
  }

  if (categories) {
    filteredExpenses = filteredExpenses.filter(
      (expense) => expense.category === categories,
    );
  }

  if (from && to) {
    const fromDate = new Date(from);
    const toDate = new Date(to);

    filteredExpenses = filteredExpenses.filter(
      (expense) =>
        fromDate <= new Date(expense.spentAt) &&
        toDate >= new Date(expense.spentAt),
    );
  }

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
  }
};

module.exports = {
  init,
  getFilteredExpenses,
  getExpenseById,
  addExpense,
  updateExpense,
  deleteExpense,
};
