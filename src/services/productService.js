const { generateUniqueId } = require('../utils/generateUniqueId');
const { getUserById } = require('./userServices');

let expenses = [];

const clearExpenses = () => {
  expenses = [];
};

const getExpenses = (
  userId = null,
  categories = null,
  from = null,
  to = null,
) => {
  return expenses.filter((expense) => {
    let isValid = true;

    if (userId) {
      isValid = isValid && expense.userId === Number(userId);
    }

    if (categories) {
      isValid = isValid && categories.includes(expense.category);
    }

    if (from) {
      isValid = isValid && new Date(expense.spentAt) >= new Date(from);
    }

    if (to) {
      isValid = isValid && new Date(expense.spentAt) <= new Date(to);
    }

    return isValid;
  });
};

const getExpenseById = (id) => expenses.find((expense) => expense.id === id);

const addExpense = ({ userId, spentAt, title, amount, category, note }) => {
  const id = generateUniqueId();

  const checkUserById = getUserById(userId);

  if (!checkUserById) {
    throw new Error(`User with ID ${userId} not found.`);
  }

  const createNewExpense = {
    id: id,
    userId,
    spentAt: new Date(spentAt).toISOString(),
    title,
    amount,
    category,
    note: note || '',
  };

  expenses.push(createNewExpense);

  return createNewExpense;
};

const updatedExpense = (id, updates) => {
  const expenseIndex = expenses.findIndex((ex) => ex.id === id);

  if (expenseIndex !== -1) {
    expenses[expenseIndex] = { ...expenses[expenseIndex], ...updates };

    return expenses[expenseIndex];
  }
};

const deleteExpense = (id) => {
  const expenseIndex = expenses.findIndex((expense) => expense.id === id);

  if (expenseIndex === -1) {
    return null;
  }

  const deletedExpense = expenses.splice(expenseIndex, 1)[0];

  return deletedExpense;
};

module.exports = {
  getExpenses,
  getExpenseById,
  addExpense,
  updatedExpense,
  deleteExpense,
  clearExpenses,
};
