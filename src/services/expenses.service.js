const { v4: uuidv4 } = require('uuid');
/* eslint-disable function-paren-newline */
const randNumb = () => {
  return +uuidv4().replace(/[^0-9]/g, '');
};

let expenses = [];

const getAllExpenses = () => {
  return expenses;
};

const getFilteredExpenses = (expenseParams) => {
  const { userId, from, to, categories } = expenseParams;
  let filteredExpenses = expenses;

  if (userId) {
    filteredExpenses = filteredExpenses.filter(
      (expense) => +expense.userId === +userId,
    );
  }

  if (from) {
    const fromDate = new Date(from);

    filteredExpenses = filteredExpenses.filter(
      (expense) => new Date(expense.spentAt) >= fromDate,
    );
  }

  if (to) {
    const toDate = new Date(to);

    filteredExpenses = filteredExpenses.filter(
      (expense) => new Date(expense.spentAt) <= toDate,
    );
  }

  if (categories) {
    filteredExpenses = filteredExpenses.filter((expense) =>
      categories.includes(expense.category),
    );
  }

  return filteredExpenses;
};

const addExpense = ({ userId, spentAt, title, amount, category, note }) => {
  const newExpense = {
    id: randNumb(),
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

const getExpenseById = (id) => {
  return expenses.find((expense) => +expense.id === +id);
};

const removeExpenseById = (id) => {
  expenses = expenses.filter((expense) => +expense.id !== +id);
};

const updateExpenseById = (
  { spentAt, title, amount, category, note },
  currentExpense,
) => {
  if (spentAt) {
    currentExpense.spentAt = spentAt;
  }

  if (title) {
    currentExpense.title = title;
  }

  if (amount) {
    currentExpense.amount = amount;
  }

  if (category) {
    currentExpense.category = category;
  }

  if (note) {
    currentExpense.note = note;
  }

  return currentExpense;
};

const init = () => {
  expenses = [];
};

module.exports = {
  getAllExpenses,
  getFilteredExpenses,
  getExpenseById,
  removeExpenseById,
  updateExpenseById,
  addExpense,
  init,
};
