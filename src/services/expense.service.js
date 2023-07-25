'use strict';

const { getNewId } = require('../helpers');

let expenses = [];

const getAll = (query) => {
  const {
    userId,
    from,
    to,
    categories,
  } = query;

  let filteredExpenses = expenses;

  if (userId) {
    filteredExpenses = filteredExpenses
      .filter(expense => expense.userId === Number(userId));
  }

  if (from) {
    const fromDate = new Date(from);

    filteredExpenses = expenses.filter(expense => {
      const spentAt = new Date(expense.spentAt);

      return spentAt >= fromDate;
    });
  }

  if (to) {
    const toDate = new Date(to);

    filteredExpenses = expenses.filter(expense => {
      const spentAt = new Date(expense.spentAt);

      return spentAt <= toDate;
    });
  }

  if (categories) {
    filteredExpenses = expenses.filter(expense => (
      categories.includes(expense.category)
    ));
  }

  return filteredExpenses;
};

const getById = (id) => {
  const foundExpense = expenses
    .find(expense => expense.id === id);

  return foundExpense || null;
};

const create = ({
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
}) => {
  const newId = getNewId(expenses);

  const newExpense = {
    id: newId,
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

const remove = (id) => {
  expenses = expenses.filter(expense => expense.id !== id);
};

const update = (id, body) => {
  const expense = this.getById(id);

  Object.assign(expense, ...body);

  return expense;
};

const expenseService = {
  getAll,
  getById,
  create,
  remove,
  update,
};

module.exports = {
  expenseService,
};
