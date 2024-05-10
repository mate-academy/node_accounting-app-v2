const { getFilteredExpenses } = require('../utils/getFilteredExpenses');

let expenses = [];

const expensesInit = () => {
  expenses = [];
};

const getExpenses = (query) => {
  expenses = getFilteredExpenses(expenses, query);

  return expenses;
};

const getExpense = (id) => {
  return expenses.find((currentExpense) => currentExpense.id === +id) || null;
};

const createExpense = ({ userId, spentAt, title, amount, category, note }) => {
  const newExpense = {
    id: new Date().getTime(),
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

const updateExpense = (id, body) => {
  return Object.assign(getExpense(id), { ...body });
};

const deleteExpense = (id) => {
  expenses = expenses.filter((currentExpense) => currentExpense.id !== id);
};

module.exports = {
  expensesInit,
  getExpenses,
  getExpense,
  createExpense,
  updateExpense,
  deleteExpense,
};
