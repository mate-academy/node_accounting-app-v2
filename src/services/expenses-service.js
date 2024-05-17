/* eslint-disable indent */
const { findItemById, getId, getFilteredArray } = require('./helper');

let expenses = [];

const clearExpensesData = () => {
  expenses = [];
};

const getFilteredExpenses = (query) => {
  let filteredExpenses = expenses;

  if (query) {
    const { userId, categories, from, to } = query;

    filteredExpenses = userId
      ? expenses.filter((exp) => String(exp.userId) === String(userId))
      : expenses;

    filteredExpenses = categories
      ? expenses.filter((exp) => categories.includes(exp.category))
      : filteredExpenses;

    filteredExpenses = from
      ? filteredExpenses.filter(
          (exp) => new Date(exp.spentAt) >= new Date(from),
        )
      : filteredExpenses;

    filteredExpenses = to
      ? filteredExpenses.filter((exp) => new Date(exp.spentAt) <= new Date(to))
      : filteredExpenses;
  }

  return filteredExpenses;
};

const getExpensesData = (query) => {
  const filteredExpenses = getFilteredExpenses(query);

  return filteredExpenses;
};

const getOneExpenseData = (id) => {
  return findItemById(expenses, id);
};

const addExpense = (expense) => {
  expenses.push(expense);
};

const getNewId = () => {
  return getId(expenses);
};

const getFilteredExpensesById = (id) => {
  return getFilteredArray(expenses, id);
};

const setNewExpenses = (newExpenses) => {
  expenses = newExpenses;
};

const updatedExpenseData = (id, newData) => {
  expenses = expenses.map((expense) => {
    if (String(expense.id) === String(id)) {
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
  getNewId,
  addExpense,
  getFilteredExpensesById,
  setNewExpenses,
  updatedExpenseData,
  clearExpensesData,
};
