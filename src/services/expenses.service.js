let expenses = [];
const { newId } = require('../utils/newId');

const reset = () => {
  expenses = [];

  return expenses;
};

const getAll = ({ from, to, userId, categories }) => {
  let filteredExpenses = expenses;

  if (from) {
    filteredExpenses = filteredExpenses.filter((expense) => {
      return new Date(expense.spentAt) >= new Date(from);
    });
  }

  if (to) {
    filteredExpenses = filteredExpenses.filter((expense) => {
      return new Date(expense.spentAt) <= new Date(to);
    });
  }

  if (userId) {
    filteredExpenses = filteredExpenses.filter((expense) => {
      return expense.userId === Number(userId);
    });
  }

  if (Array.isArray(categories) && categories.length > 0) {
    filteredExpenses = filteredExpenses.filter((expense) => {
      return categories.includes(expense.category);
    });
  } else if (typeof categories === 'string') {
    filteredExpenses = filteredExpenses.filter((expense) => {
      return expense.category === categories;
    });
  }

  return filteredExpenses;
};

const getById = (id) => {
  return expenses.find((expense) => expense.id === Number(id));
};

const create = ({ userId, spentAt, title, amount, category, note }) => {
  const expense = {
    id: newId(expenses),
    spentAt,
    userId,
    title,
    amount,
    category,
    note,
  };

  expenses.push(expense);

  return expense;
};

const update = ({ id, newExpense }) => {
  const expense = getById(id);

  Object.assign(expense, newExpense);

  return expense;
};

const remove = (id) => {
  const index = expenses.findIndex((expense) => expense.id === Number(id));

  expenses.splice(index, 1);
};

module.exports = {
  reset,
  getAll,
  getById,
  create,
  update,
  remove,
};
