const { userService } = require('..//api/user.service');

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
  let filterExpenses = [...expenses];

  if (userId) {
    filterExpenses = filterExpenses.filter((e) => e.id === +userId);
  }

  if (categories) {
    filterExpenses = filterExpenses.filter((e) => e.category === categories);
  }

  if (from && to) {
    filterExpenses = filterExpenses.filter((e) => {
      return (
        new Date(e.spentAt) >= new Date(from) &&
        new Date(e.spentAt) <= new Date(to)
      );
    });
  }

  return filterExpenses;
};

const createExpense = async ({
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
}) => {
  const foundUser = await userService.getUser(+userId);

  if (!foundUser) {
    return null;
  }

  const newExpense = {
    id: expenses.length,
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

const getExpense = (expenseId) => {
  const expense = expenses.find((e) => e.id === expenseId);

  return expense;
};

const deleteExpense = (expenseId) => {
  const expenseIndex = expenses.findIndex((e) => e.id === expenseId);

  if (expenseIndex === -1) {
    return false;
  }

  expenses.splice(expenseIndex, 1);

  return true;
};

const updateExpense = (expenseId, data) => {
  const expenseIndex = expenses.findIndex((e) => e.id === +expenseId);

  if (expenseIndex === -1) {
    return null;
  }

  const newExpense = { ...expenses[expenseIndex], ...data };

  expenses[expenseIndex] = newExpense;

  return newExpense;
};

const expenseService = {
  clearExpenses,
  getExpenses,
  createExpense,
  getExpense,
  deleteExpense,
  updateExpense,
};

module.exports = { expenseService };
