const { generateUniqueId } = require('../utils/getRandomId');

let expenses = [];

const start = () => {
  expenses = [];
};

const getExpenses = (
  userId = null,
  categories = null,
  from = null,
  to = null,
) => {
  const filteredExpenses = expenses.filter((expense) => {
    let isValid = true;

    if (userId) {
      isValid = isValid && expense.userId === Number(userId);
    }

    if (categories && categories.length > 0) {
      isValid = isValid && categories.includes(expense.category);
    }

    if (from && to) {
      isValid = isValid && expense.spentAt >= from && expense.spentAt <= to;
    } else if (from) {
      isValid = isValid && expense.spentAt >= from;
    } else if (to) {
      isValid = isValid && expense.spentAt <= to;
    }

    return isValid;
  });

  return filteredExpenses;
};

const getExpenseById = (id) => {
  return expenses.find((expense) => expense.id === id) || null;
};

const create = (newFields) => {
  const newExpense = {
    id: generateUniqueId(),
    ...newFields,
  };

  expenses.push(newExpense);

  return newExpense;
};

const remove = (id) => {
  expenses = expenses.filter((expense) => expense.id !== id);
};

const update = (id, fields) => Object.assign(getExpenseById(id), { ...fields });

module.exports = {
  start,
  getExpenses,
  getExpenseById,
  create,
  remove,
  update,
};
