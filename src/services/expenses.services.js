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
  return expenses.find((expense) => expense.id === Number(id));
};

const create = (fields) => {
  const newExpense = {
    id: generateNextId(),
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

  Object.assign(expense, fieldsToUpdate);

  return expense;
};

const validateExpenseData = (data) => {
  const { userId, spentAt, title, amount, category, note } = data;

  const isUserIdValid = typeof userId === 'number';
  const isSpentAtValid = typeof spentAt === 'string';
  const isTitleValid = typeof title === 'string' && title.trim().length > 0;
  const isAmountValid = typeof amount === 'number';
  const isCategoryValid =
    typeof category === 'string' && category.trim().length > 0;
  const isNoteValid = typeof note === 'string' && note.trim().length > 0;

  return {
    isValid:
      isUserIdValid &&
      isSpentAtValid &&
      isTitleValid &&
      isAmountValid &&
      isCategoryValid &&
      isNoteValid,
  };
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
