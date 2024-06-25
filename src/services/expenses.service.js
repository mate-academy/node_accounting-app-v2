/* eslint-disable function-paren-newline */
let expenses = [];

const { v4: uuidv4 } = require('uuid');

const generateUniqNumberId = () => {
  const uuid = uuidv4()
    .replace(/[^0-9]/g, '')
    .slice(0, 5);

  return Number(uuid);
};

const getAllExpenses = () => {
  return expenses;
};

const getFilteredExpenses = (expenseParams) => {
  const { userId, from, to, categories } = expenseParams;
  let filteredExpenses = expenses;

  if (userId) {
    filteredExpenses = filteredExpenses.filter(
      (expense) => Number(expense.userId) === Number(userId),
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
    id: generateUniqNumberId(),
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
  return expenses.find((expense) => Number(expense.id) === Number(id));
};

const getExpenseByIdIndex = (id) => {
  return expenses.findIndex((expense) => Number(expense.id) === Number(id));
};

const removeExpenseById = (id) => {
  expenses = expenses.filter((expense) => Number(expense.id) !== Number(id));
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
  addExpense,
  getExpenseById,
  getExpenseByIdIndex,
  removeExpenseById,
  updateExpenseById,
  init,
};
