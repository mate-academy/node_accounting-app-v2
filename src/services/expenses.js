'use strict';

let expenses = [];

const reset = () => {
  expenses = [];
};

const getAll = () => expenses;

const getAllFilteredExpenses
  = ({ userId, categories, from, to }) => {
    if (!expenses) {
      return [];
    }

    return expenses.filter(expense => {
      const isUserIdMatch = userId
        ? expense.userId === +userId
        : true;

      const isCategoryMatch = categories
        ? categories.includes(expense.category)
        : true;

      const isFromMatch = from
        ? expense.spentAt > from
        : true;

      const isToMatch = to
        ? expense.spentAt < to
        : true;

      return isUserIdMatch
        && isCategoryMatch
        && isFromMatch
        && isToMatch;
    });
  };

const getById = (expenseId) => {
  const foundExpense = expenses.find(expense => expense.id === +expenseId);

  return foundExpense || null;
};

const add = (body) => {
  const maxId = Math.max(...expenses.map(expense => expense.id), 0);

  const newExpense = {
    id: maxId + 1,
    ...body,
  };

  expenses.push(newExpense);

  return newExpense;
};

const remove = (expenseId) => {
  expenses = expenses.filter(expense => expense.id !== +expenseId);
};

const update = (expenseId, body) => {
  const foundExpense = getById(expenseId);

  Object.assign(foundExpense, body);

  return foundExpense;
};

module.exports.expensesService = {
  reset,
  getAll,
  getAllFilteredExpenses,
  getById,
  add,
  remove,
  update,
};
