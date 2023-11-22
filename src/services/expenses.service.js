'use strict';

let EXPENSES = [];

const getExpenses = () => {
  return EXPENSES;
};

const getExpenseById = (id) => {
  return EXPENSES.find((e) => e.id === +id) || null;
};

const getExpensesByQuery = (query) => {
  let expenses = [...EXPENSES];

  for (const key in query) {
    switch (key) {
      case 'id':
        expenses = expenses.filter((e) => e.id === +query.id);
        break;
      case 'userId':
        expenses = expenses.filter((e) => e.userId === +query.userId);
        break;
      case 'from':
        expenses = expenses.filter((e) => e.spentAt >= query.from);
        break;
      case 'to':
        expenses = expenses.filter((e) => e.spentAt <= query.to);
        break;
      case 'categories':
        expenses = expenses.filter((e) => e.category === query.categories);
        break;
      default:
        break;
    }
  }

  return expenses;
};

const addExpense = (expense) => {
  const createdExpense = {
    ...expense,
    id: Math.random(),
  };

  EXPENSES.push(createdExpense);

  return createdExpense;
};

const updateExpense = (id, expense) => {
  const findExpense = getExpenseById(id);

  if (!findExpense) {
    return null;
  }

  const updatedExpense = {
    ...findExpense,
    ...expense,
  };

  Object.assign(findExpense, updatedExpense);

  return updatedExpense;
};

const removeExpenseById = (id) => {
  EXPENSES = EXPENSES.filter((e) => e.id !== +id);
};

const clearExpenses = () => {
  EXPENSES = [];
};

module.exports = {
  clearExpenses,
  addExpense,
  getExpenseById,
  updateExpense,
  removeExpenseById,
  getExpenses,
  getExpensesByQuery,
};
