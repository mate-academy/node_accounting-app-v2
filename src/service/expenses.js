'use strict';

let expenses = [];

const getAllExpenses = () => {
  return expenses;
};

const getByQuery = (query) => {
  let result = [...expenses];

  if (!query || Object.keys(query).length === 0) {
    return result;
  }

  const { userId, categories, from, to } = query;

  if (userId) {
    result = result.filter((expense) => expense.userId === +userId);
  }

  if (categories) {
    const categoryList = Array.isArray(categories)
      ? categories
      : categories.split(',');

    result = result.filter((expense) => {
      return categoryList.includes(expense.category);
    });
  }

  if (from && to) {
    const fromDate = new Date(from);
    const toDate = new Date(to);

    result = result.filter((expense) => {
      const expenseData = new Date(expense.spentAt);

      return expenseData >= fromDate && expenseData <= toDate;
    });
  }

  return result;
};

const getExpenseById = (id) => {
  return expenses.find((exp) => exp.id === +id);
};

const createExpense = (expenseData) => {
  const maxId =
    expenses.length > 0 ? Math.max(...expenses.map((exp) => exp.id)) + 1 : 0;

  const expense = {
    id: maxId,
    ...expenseData,
  };

  expenses.push(expense);

  return expense;
};

const deleteExpense = (id) => {
  expenses = expenses.filter((expense) => expense.id !== id);
};

const updateExpense = (id, expenseData) => {
  const index = expenses.findIndex((exp) => exp.id === +id);

  if (index === -1) {
    return false;
  }

  Object.assign(expenses[index], expenseData);

  return expenses[index];
};

const clear = () => {
  expenses = [];
};

module.exports = {
  getAllExpenses,
  getByQuery,
  getExpenseById,
  createExpense,
  deleteExpense,
  updateExpense,
  clear,
};
