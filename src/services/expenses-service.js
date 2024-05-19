/* eslint-disable indent */
const { findItemById, getId, getFilteredArrayById } = require('./helper');

let expenses = [];

const clearExpensesData = () => {
  expenses = [];
};

const getFilteredExpenses = (query) => {
  if (!query) {
    return expenses;
  }

  const { userId, categories, from, to } = query;

  return expenses.filter((exp) => {
    if (userId && Number(exp.userId) !== Number(userId)) {
      return false;
    }

    if (categories && !categories.includes(exp.category)) {
      return false;
    }

    if (from && new Date(exp.spentAt) < new Date(from)) {
      return false;
    }

    if (to && new Date(exp.spentAt) > new Date(to)) {
      return false;
    }

    return true;
  });
};

const getExpensesData = (query) => {
  const filteredExpenses = getFilteredExpenses(query);

  return filteredExpenses;
};

const getOneExpenseData = (id) => {
  return findItemById(expenses, id);
};

const addExpense = ({ userId, spentAt, title, amount, category, note }) => {
  const expense = {
    id: getId(expenses),
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(expense);

  return expense;
};

const removeExpense = (id) => {
  const newExpenses = getFilteredArrayById(expenses, id);

  expenses = newExpenses;

  return newExpenses;
};

const updatedExpenseData = (id, newData) => {
  expenses = expenses.map((expense) => {
    if (Number(expense.id) === Number(id)) {
      return {
        ...expense,
        spentAt: newData.spentAt || expense.spentAt,
        title: newData.title || expense.title,
        amount: newData.amount || expense.amount,
        category: newData.category || expense.category,
        note: newData.note || expense.note,
      };
    }

    return expense;
  });

  return getOneExpenseData(id);
};

module.exports = {
  getExpensesData,
  getOneExpenseData,
  addExpense,
  removeExpense,
  updatedExpenseData,
  clearExpensesData,
};
