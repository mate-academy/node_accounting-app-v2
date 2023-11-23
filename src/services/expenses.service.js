'use strict';

let EXPENSES = [];

const getExpenses = () => {
  return EXPENSES;
};

const getExpenseById = (id) => {
  return EXPENSES.find((e) => e.id === +id) || null;
};

const getExpensesByQuery = (query) => {
  return [...EXPENSES].filter((expense) => {
    for (const key in query) {
      switch (key) {
        case 'id':
        case 'userId':
          if (expense[key] !== +query[key]) {
            return false;
          }
          break;
        case 'from':
        case 'to':
          if (key === 'from' && expense.spentAt < query.from) {
            return false;
          }

          if (key === 'to' && expense.spentAt > query.to) {
            return false;
          }
          break;
        case 'categories':
          if (expense.category !== query.categories) {
            return false;
          }
          break;
        default:
          break;
      }
    }

    return true;
  });
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
