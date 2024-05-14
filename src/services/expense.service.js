/* eslint-disable function-paren-newline */
const { createUniqueID } = require('../utils/createUniqueID');

let expenses = [];

const initExpenses = () => {
  expenses = [];
};

const getAllExpenses = (id, categories, from, to) => {
  let preparedExpenses = expenses;

  if (id) {
    preparedExpenses = preparedExpenses.filter(({ userId }) => userId === id);
  }

  if (categories) {
    preparedExpenses = preparedExpenses.filter(({ category }) =>
      categories.includes(category),
    );
  }

  const fromDate = new Date(from);
  const toDate = new Date(to);
  // to create server

  const earliestDate = !isNaN(fromDate)
    ? fromDate.toISOString()
    : new Date(0).toISOString();
  const latestDate = !isNaN(toDate)
    ? toDate.toISOString()
    : new Date().toISOString();

  if (from || to) {
    preparedExpenses = preparedExpenses.filter(
      ({ spentAt }) => spentAt >= earliestDate && spentAt <= latestDate,
    );
  }

  return preparedExpenses;
};

const getExpenseById = (id) => {
  return expenses.find((user) => user.id === Number(id)) || null;
};

const createExpense = (expense) => {
  const newExpense = { id: createUniqueID(), ...expense };

  expenses.push(newExpense);

  return newExpense;
};

const updateExpense = (fieldsToUpdate) => {
  const expense = expenses.find((usr) => usr.id === fieldsToUpdate.id) || null;

  Object.assign(expense, fieldsToUpdate);

  return expense;
};

const removeExpense = (id) => {
  expenses = expenses.filter((usr) => usr.id !== Number(id));
};

module.exports = {
  initExpenses,
  getAllExpenses,
  getExpenseById,
  createExpense,
  removeExpense,
  updateExpense,
};
