/* eslint-disable function-paren-newline */
const Match = require('../filterExp');

let expenses = [];

const allExpenses = (id, categories, from, to) => {
  const fromDate = from
    ? new Date(from).toISOString()
    : new Date(0).toISOString();

  const toDate = to ? new Date(to).toISOString() : new Date().toISOString();

  return expenses.filter((expense) =>
    Match.isExpenseMatch(expense, id, categories, fromDate, toDate),
  );
};

const expenseById = (id) => {
  return expenses.find((item) => item.id === Number(id));
};

const createExpenses = ({ userId, spentAt, title, amount, category, note }) => {
  const newExpense = {
    id: Math.floor(Math.random() * 10000),
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

const deleteExpenses = (id) => {
  expenses = expenses.filter((expense) => expense.id !== Number(id));
};

const updateExpenses = (id, body) => {
  const expense = expenses.find((item) => item.id === Number(id));

  Object.assign(expense, body);
};

const clearExpenses = () => {
  expenses = [];
};

module.exports = {
  allExpenses,
  expenseById,
  createExpenses,
  deleteExpenses,
  updateExpenses,
  clearExpenses,
};
//
