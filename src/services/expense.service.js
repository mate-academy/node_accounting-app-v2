'use strict';

const { getNewId, findById } = require('../helpers');

let expenses = [];

const clearExpenses = () => {
  expenses = [];
};

const getAllExpenses = (query) => filterExpenses(expenses, query);

const getExpenseById = (expenseId) => findById(expenses, +expenseId);

const createExpense = ({
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
}) => {
  const newExpense = {
    id: getNewId(expenses),
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(newExpense);

  return newExpense;
};

const removeExpense = (expenseId) => {
  expenses = expenses.filter(item => item.id !== +expenseId);

  return expenses;
};

const updateExpense = (expenseId, updateData) => {
  const expense = getExpenseById(expenseId);

  Object.assign(expense, updateData);

  return expense;
};

function filterExpenses(data, {
  userId,
  categories,
  from,
  to,
}) {
  let filteredExpenses = data;

  if (userId) {
    filteredExpenses = filteredExpenses.filter(expense => (
      expense.userId === +userId
    ));
  }

  if (categories) {
    filteredExpenses = filteredExpenses.filter(expense => (
      categories.includes(expense.category))
    );
  }

  if (from && to) {
    const fromDate = new Date(from);
    const toDate = new Date(to);

    filteredExpenses = filteredExpenses.filter(expense => (
      new Date(expense.spentAt) >= fromDate
      && new Date(expense.spentAt) <= toDate
    ));
  }

  return filteredExpenses;
}

module.exports = {
  getAllExpenses,
  getExpenseById,
  createExpense,
  removeExpense,
  updateExpense,
  clearExpenses,
};
