// const { v4: uuidv4 } = require('uuid');

let expenses = [];

const createExpenses = (userId, spentAt, title, amount, category, note) => {
  const newExpenses = {
    id: expenses.length,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(newExpenses);

  return newExpenses;
};

const resetExpenses = () => {
  expenses = [];
};

const updateExpense = (id, data) => {
  const currentExpense = getExpenseById(id);

  Object.assign(currentExpense, data);

  return currentExpense;
};
const removeExpense = (id) => {
  expenses = expenses.filter((expense) => expense.id !== +id);
};
const getExpenseById = (id) => {
  return expenses.find((expense) => expense.id === +id);
};
const getAllExpenses = ({ userId, categories, from, to }) => {
  let filteredExpenses = expenses;

  if (userId) {
    filteredExpenses = filteredExpenses.filter(
      (expense) => expense.userId === +userId,
    );
  }

  if (categories) {
    filteredExpenses = filteredExpenses.filter(
      (expense) => expense.category === categories,
    );
  }

  if (from) {
    filteredExpenses = filteredExpenses.filter(
      (expense) => new Date(expense.spentAt) >= new Date(from),
    );
  }

  if (to) {
    filteredExpenses = filteredExpenses.filter(
      (expense) => new Date(expense.spentAt) <= new Date(to),
    );
  }

  return filteredExpenses;
};

module.exports = {
  createExpenses,
  resetExpenses,
  updateExpense,
  removeExpense,
  getAllExpenses,
  getExpenseById,
};
