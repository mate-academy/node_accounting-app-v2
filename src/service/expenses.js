const { v4: uuidv4 } = require('uuid');

let expenses = [];

const reset = () => {
  expenses = [];
};

const filterExpanses = (expense, queryParams) => {
  const { userId, categories, from, to } = queryParams;

  const isValidUserId = !userId || expense.userId === Number(userId);
  const isValidCategories = !categories
    || categories.includes(expense.category);
  const isValidFromDate = !from || new Date(expense.spentAt) >= new Date(from);
  const isValidToData = !to || new Date(expense.spentAt) <= new Date(to);

  return isValidUserId && isValidCategories && isValidFromDate && isValidToData;
};

const getAll = (params) => {
  const filteredExpenses = expenses
    .filter(expense => filterExpanses(expense, params));

  return filteredExpenses;
};

const getById = (expenseId) => {
  const foundExpense = expenses.find(expense => expenseId === expense.id);

  return foundExpense || null;
};

const add = ({
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
}) => {
  const newExpense = {
    id: uuidv4(),
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

const remove = (expenseId) => {
  expenses = expenses.filter(user => user.id !== expenseId);
};

const update = (id, updatedData) => {
  const expense = getById(id);

  Object.assign(expense, updatedData);

  return expense;
};

module.exports = {
  getAll,
  getById,
  add,
  remove,
  update,
  reset,
};
