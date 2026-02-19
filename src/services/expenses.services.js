const { generateNextId } = require('../utils/generateNextId.utility');

let expenses = [];

const resetExpenses = () => {
  expenses = [];
};

const getAll = ({ userId, categories, from, to }) => {
  let result = expenses;

  if (userId) {
    result = result.filter((expense) => expense.userId === Number(userId));
  }

  if (categories) {
    const categoriesArray = Array.isArray(categories)
      ? categories
      : [categories];

    result = result.filter((e) => categoriesArray.includes(e.category));
  }

  if (from) {
    const dateFrom = new Date(from);

    result = result.filter((expense) => new Date(expense.spentAt) >= dateFrom);
  }

  if (to) {
    const dateTo = new Date(to);

    result = result.filter((expense) => new Date(expense.spentAt) <= dateTo);
  }

  return result;
};

const getById = (id) => {
  return expenses.find((expense) => expense.id === Number(id)) || null;
};

const create = (fields) => {
  const newExpense = {
    id: generateNextId(expenses),
    ...fields,
  };

  expenses = [...expenses, newExpense];

  return newExpense;
};

const remove = (id) => {
  expenses = expenses.filter((expense) => expense.id !== Number(id));
};

const update = (id, fieldsToUpdate) => {
  const expense = getById(id);

  if (expense) {
    Object.assign(expense, fieldsToUpdate);
  }

  return expense;
};

const validateExpenseData = (data) => {
  if (!data || typeof data !== 'object') {
    return false;
  }

  const { userId, spentAt, title, amount, category, note } = data;

  if (
    typeof userId !== 'number' ||
    typeof spentAt !== 'string' ||
    typeof title !== 'string' ||
    typeof amount !== 'number' ||
    typeof category !== 'string'
  ) {
    return false;
  }

  if (title.trim().length === 0 || category.trim().length === 0) {
    return false;
  }

  if (note !== undefined && typeof note !== 'string') {
    return false;
  }

  return true;
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
  resetExpenses,
  validateExpenseData,
};
