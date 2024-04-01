const { v4: uuidv4 } = require('uuid');
const usersService = require('../services/user');

let Expenses = [];

const getAll = (userId, categories, from, to) => {
  let filteredExpenses = [...Expenses];

  if (userId) {
    filteredExpenses = filteredExpenses.filter(
      (expense) => expense.userId === +userId,
    );
  }

  if (categories) {
    filteredExpenses = filteredExpenses.filter(
      (expense) => expense.category === categories,
    );
  }

  if (from && to) {
    const dateFrom = new Date(from);
    const dateTo = new Date(to);

    filteredExpenses = filteredExpenses.filter(
      (expense) =>
        dateFrom <= new Date(expense.spentAt) &&
        new Date(expense.spentAt) <= dateTo,
    );
  }

  return filteredExpenses;
};

const getById = (id) => {
  return Expenses.find((expense) => expense.id === id);
};

const create = (data) => {
  const user = usersService.getById(data.userId);

  if (!user) {
    return null;
  }

  const newExpense = {
    id: uuidv4(),
    ...data,
  };

  Expenses.push(newExpense);

  return newExpense;
};

const update = (id, body) => {
  const Expense = getById(id);

  if (!Expense) {
    return null;
  }

  return Object.assign(Expense, body);
};

const remove = (id) => {
  Expenses = Expenses.filter((expense) => expense.id !== id);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
