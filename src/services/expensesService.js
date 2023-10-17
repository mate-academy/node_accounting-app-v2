'use strict';

let expenses = [];

const clearExpenses = () => {
  expenses = [];
};

const getAll = ({ userId, categories, from, to }) => {
  if (!userId && !categories && !from && !to) {
    return expenses;
  }

  return expenses.filter((expense) => {
    return (userId ? +userId === expense.userId : true)
      && (categories ? categories.includes(expense.category) : true)
      && (from ? +new Date(expense.spentAt) > +new Date(from) : true)
      && (to ? +new Date(expense.spentAt) < +new Date(to) : true);
  });
};

const addExpense = (expenseData) => {
  const expense = {
    id: +new Date(),
    ...expenseData,
  };

  expenses.push(expense);

  return expense;
};

const getById = id => {
  return expenses.find(expense => id === expense.id) || null;
};

const deleteById = id => {
  if (getById(id)) {
    expenses = expenses.filter(expense => expense.id !== id);

    return true;
  }

  return false;
};

const updateById = (expenseData) => {
  const { id } = expenseData;
  const expense = getById(id);

  if (expense) {
    Object.assign(expense, expenseData);

    return expense;
  }
};

module.exports = {
  getAll,
  addExpense,
  getById,
  deleteById,
  updateById,
  clearExpenses,
};