'use strict';

let expenses = [];

const getAll = () => {
  return expenses;
};

const getById = (expenseId) => {
  return expenses.find(expense => +expense.id === +expenseId) || null;
};

const create = ({ userId, spentAt, title, amount, category, note }) => {
  const newExpense = {
    id: +new Date(),
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
  expenses = expenses.filter(expense => expense.id !== expenseId);
};

const update = (expenseId, body) => {
  const expense = getById(expenseId);

  if (!expense) {
    return;
  }

  Object.assign(expense, body);

  return expense;
};

const resetExpenses = () => {
  expenses = [];
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
  resetExpenses,
};
