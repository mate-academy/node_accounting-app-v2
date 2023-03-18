'use strict';

let expenses = [];

const init = () => {
  expenses = [];
};

const getAll = ({ userId, category, from, to }) => {
  return expenses.filter(expense => {
    const isUserIdMatch = userId
      ? expense.userId === Number(userId)
      : true;

    let isCategoriesMatch;

    if (typeof category === 'string') {
      isCategoriesMatch = expense.category === category;
    } else if (Array.isArray(category)) {
      isCategoriesMatch = category.includes(expense.category);
    } else {
      isCategoriesMatch = true;
    }

    const isFromMatch = from
      ? expense.spentAt >= from
      : true;

    const isToMatch = to
      ? expense.spentAt <= to
      : true;

    return isUserIdMatch && isCategoriesMatch && isFromMatch && isToMatch;
  });
};

const findById = (expenseId) => {
  const foundExpense = expenses.find(user => {
    return user.id === expenseId;
  });

  return foundExpense || null;
};

const create = (expenseData) => {
  const id = expenses.length
    ? Math.max(...expenses.map(user => user.id)) + 1
    : 1;

  const newExpense = {
    id,
    ...expenseData,
  };

  expenses.push(newExpense);

  return newExpense;
};

const remove = (expenseId) => {
  expenses = expenses.filter(expense => expense.id !== expenseId);

  return expenses;
};

const update = (expenseId, updateData) => {
  const expense = findById(expenseId);

  Object.assign(expense, updateData);

  return expense;
};

module.exports = {
  init,
  getAll,
  findById,
  create,
  remove,
  update,
};
