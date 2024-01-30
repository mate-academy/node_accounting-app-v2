'use strict';

let expenses = [];

const getAllExpenses = ({ userId, categories, from, to }) => {
  let result = [...expenses];

  if (userId) {
    result = result.filter(el => el.userId === +userId);
  }

  if (categories) {
    result = result.filter(el => el.category === categories);
  }

  if (from) {
    result = result.filter(el => new Date(el.spentAt) > new Date(from));
  }

  if (to) {
    result = result.filter(el => new Date(el.spentAt) < new Date(to));
  }

  return result;
};

const getExpensesById = (id) => {
  const expense = expenses.find(el => el.id === +id) || null;

  return expense;
};

const createExpense = (userId, spentAt, title, amount, category, note) => {
  const expense = {
    id: expenses.length,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(expense);

  return expense;
};

const deleteExpenses = (id) => {
  expenses = expenses.filter(el => el.id !== +id);
};

const editExpense = (title, expense) => {
  return Object.assign(expense, { title });
};

module.exports = {
  getAllExpenses,
  getExpensesById,
  createExpense,
  deleteExpenses,
  editExpense,
};
