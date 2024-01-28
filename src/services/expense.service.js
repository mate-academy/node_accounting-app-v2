'use strict';

let expenses = [];
let idState = 0;

const get = (userId, categories, from, to) => {
  const filteredExpenses = expenses.filter(expense => {
    const userIdMatch = userId.length
      ? userId === expense.id
      : true;

    const categoriesMatch = categories.length
      ? expense.categories.some(category => categories.includes(category))
      : true;

    const dateMatch = from.length && to.length
      ? expense.spentAt >= from && expense.spentAt <= to
      : true;

    return userIdMatch && categoriesMatch && dateMatch;
  });

  return filteredExpenses;
};

const post = (userId, spentAt, title, amount, category, note) => {
  if (!userId) {
    return 'No userId';
  }

  if (!spentAt) {
    return 'No spentAt';
  }

  if (!title) {
    return 'No title';
  }

  if (!amount) {
    return 'No amount';
  }

  if (!category.length) {
    return 'No category';
  }

  const newExpense = {
    id: idState,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  idState = idState + 1;

  return newExpense;
};

const getById = (id) => {
  const foundExpense = expenses.find(expense => expense.id === id);

  if (!foundExpense) {
    return null;
  }

  return foundExpense;
};

const remove = (id) => {
  return expenses.filter(expense => expense.id !== id);
};

const reset = () => {
  expenses = [];
  idState = 0;
};

const update = (userId, spentAt, title, amount, category, note) => {
  if (!userId) {
    return 'No userId';
  }

  if (!spentAt) {
    return 'No spentAt';
  }

  if (!title) {
    return 'No title';
  }

  if (!amount) {
    return 'No amount';
  }

  if (!category.length) {
    return 'No category';
  }

  let expenseToUpdate = expenses.find(expense => expense.title === title);

  if (expenseToUpdate) {
    return 'No expense to update';
  }

  expenses = expenses
    .filter(expense => expense.title === expenseToUpdate.title);

  expenseToUpdate = {
    ...expenseToUpdate,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(expenseToUpdate);

  return expenseToUpdate;
};

module.exports = {
  get,
  reset,
  post,
  getById,
  remove,
  update,
};
