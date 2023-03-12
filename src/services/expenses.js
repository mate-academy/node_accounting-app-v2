'use strict';

let expenses = [];

const deleteAllExpenses = () => {
  expenses = [];
};

const getAll = (query) => {
  const { userId, categories, from, to } = query;
  const usersExpenses = userId
    ? expenses.filter(expense => expense.userId === +userId)
    : expenses;
  const categoriesExpenses = categories
    ? usersExpenses.filter(expense => categories.includes(expense.category))
    : usersExpenses;
  const fromToExpenses = from && to
    ? categoriesExpenses
      .filter(expense => expense.spentAt >= from && expense.spentAt <= to)
    : categoriesExpenses;

  return fromToExpenses;
};

const getById = (expenseId) => {
  const foundUser = expenses.find(expense => expense.id === expenseId);

  return foundUser || null;
};

const createNew = (expenseToCreate) => {
  const maxId = Math.max(...expenses.map(expense => expense.id), 0);
  const newExpense = {
    id: maxId + 1,
    ...expenseToCreate,
  };

  expenses.push(newExpense);

  return newExpense;
};

const deleteById = (expenseId) => {
  expenses = expenses.filter(expense => expense.id !== expenseId);
};

const updateById = (expenseId, newExpense) => {
  const foundExpense = expenses.find(expense => expense.id === expenseId);

  Object.assign(foundExpense, newExpense);
};

module.exports = {
  getAll,
  getById,
  createNew,
  deleteById,
  updateById,
  deleteAllExpenses,
};
