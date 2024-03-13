'use strict';

let expenses = [];

const getAllExpenses = (userId, categories, from, to) => {
  let filteredExpenses = [...expenses];

  if (userId) {
    filteredExpenses = filteredExpenses.filter(e => e.userId === +userId);
  }

  if (categories && categories.length > 0) {
    filteredExpenses = filteredExpenses
      .filter(e => categories.includes(e.category));
  }

  if (from && to) {
    filteredExpenses = filteredExpenses.filter(
      expense => new Date(expense.spentAt) >= new Date(from)
        && new Date(expense.spentAt) <= new Date(to)
    );
  }

  return filteredExpenses;
};

const getExpenseById = (id) => {
  const expense = expenses.find(e => e.id === +id);

  return expense;
};

const getExpenseByUserId = (userId) => {
  const expense = expenses.filter(e => e.userId === +userId);

  return expense;
};

const getExpenseByDate = (from, to) => {
  const filteredExpenses = expenses.filter(expense => {
    return expense.spentAt >= from && expense.spentAt <= to;
  });

  return filteredExpenses;
};

const getExpenseByCategory = (userId, categories) => {
  const expense = expenses
    .filter(e => e.userId === userId && e.category === categories);

  return expense;
};

const createExpense = (expense) => {
  const newId = expenses.length + 1;

  const createdExpense = {
    id: newId,
    ...expense,
  };

  expenses.push(createdExpense);

  return createdExpense;
};

const updateExpense = (id, updatedData) => {
  const expense = getExpenseById(id);

  const updatedExpense = {
    ...expense,
    ...updatedData,
  };

  return updatedExpense;
};

const removeExpense = (id) => {
  expenses = expenses.filter(expense => expense.id !== +id);
};

const refreshExpense = () => {
  expenses.length = 0;
};

module.exports = {
  getAllExpenses,
  getExpenseById,
  getExpenseByUserId,
  getExpenseByDate,
  getExpenseByCategory,
  createExpense,
  updateExpense,
  removeExpense,
  refreshExpense,
};
