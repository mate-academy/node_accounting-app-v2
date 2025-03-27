/* eslint-disable function-paren-newline */
const { generateID } = require('../utils/generateID');

let expenses;
const start = () => {
  expenses = [];
};

const getAll = (userId, categories, fromDate, toDate) => {
  let filteredExpenses = expenses;

  if (userId) {
    filteredExpenses = filteredExpenses.filter(
      (expense) => expense.userId === +userId,
    );
  }

  if (categories) {
    if (Array.isArray(categories)) {
      filteredExpenses = filteredExpenses.filter((expense) =>
        categories.includes(expense.category),
      );
    } else {
      filteredExpenses = filteredExpenses.filter(
        (expense) => expense.category === categories,
      );
    }
  }

  if (fromDate || toDate) {
    filteredExpenses = filteredExpenses.filter((expense) => {
      const isAfterFrom = fromDate
        ? new Date(expense.spentAt) >= new Date(fromDate)
        : true;
      const isBeforeTo = toDate
        ? new Date(expense.spentAt) <= new Date(toDate)
        : true;

      return isAfterFrom && isBeforeTo;
    });
  }

  return filteredExpenses;
};

const getById = (expenseId) => {
  return expenses.find((expense) => expense.id === +expenseId);
};

const create = (userId, spentAt, title, amount, category, note) => {
  const expense = {
    id: generateID(),
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

const remove = (expenseId) => {
  expenses = expenses.filter((expense) => expense.id !== +expenseId);
};

const update = ({ id, title }) => {
  const expense = getById(id);

  if (expense) {
    // expense.title = title;
    Object.assign(expense, {
      title,
    });

    return expense;
  }

  return null;
};

module.exports = {
  start,
  getAll,
  getById,
  create,
  remove,
  update,
};
