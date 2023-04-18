'use strict';

let expenses = [];

const clearExpenses = () => {
  expenses = [];
};

const getUserExpenses = (query) => {
  const { userId, category, from, to } = query;

  if (!expenses.length) {
    return [];
  }

  return expenses.filter(expense => {
    let isIdMatch = true;
    let isCategoryMatch = true;
    let isFromMatch = true;
    let isToMatch = true;

    if (userId) {
      isIdMatch = expense.userId === +userId;
    }

    if (category) {
      isCategoryMatch = expense.category === category;
    }

    if (from) {
      isFromMatch = expense.spentAt >= from;
    }

    if (to) {
      isToMatch = expense.spentAt <= to;
    }

    return isIdMatch && isCategoryMatch && isFromMatch && isToMatch;
  });
};

const findById = (expenseId) => {
  return expenses.find(expense => expense.id === expenseId);
};

const create = (newExpenseBody) => {
  const maxId = expenses.length
    ? Math.max(...expenses.map(({ id }) => id))
    : 0;

  const newExpense = {
    id: maxId + 1,
    ...newExpenseBody,
  };

  expenses.push(newExpense);

  return newExpense;
};

const remove = (id) => {
  expenses = expenses.filter(expense => expense.id !== id);

  return expenses;
};

const update = (id, fieldsForUpdate) => {
  const expense = findById(id);

  Object.assign(expense, { ...fieldsForUpdate });
  return expense;
};

module.exports = {
  getUserExpenses,
  clearExpenses,
  findById,
  create,
  remove,
  update,
};
