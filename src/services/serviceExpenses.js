/* eslint-disable comma-dangle, prettier/prettier */

const { Expense } = require('../models/Expense');

let expenses = [];
let nextExpenseId = 1;

const getAllExpenses = (userId, categories, from, to) => {
  let result = expenses;

  if (userId) {
    result = result.filter((expense) => expense.userId === Number(userId));
  }

  if (categories) {
    const categoryList = Array.isArray(categories) ? categories : [categories];

    result = result.filter((expense) =>
      categoryList.includes(expense.category),);
  }

  if (from) {
    const fromDate = new Date(from);

    result = result.filter((expense) => new Date(expense.spentAt) >= fromDate);
  }

  if (to) {
    const toDate = new Date(to);

    result = result.filter((expense) => new Date(expense.spentAt) <= toDate);
  }

  return result;
};

const getExpenseById = (id) => {
  return expenses.find((expense) => expense.id === Number(id));
};

const createExpense = (userId, spentAt, title, amount, category, note) => {
  const expense = new Expense(
    nextExpenseId++,
    Number(userId),
    spentAt,
    title,
    Number(amount),
    category,
    note || '',
  );

  expenses.push(expense);

  return expense;
};

const updateExpense = (id, updates) => {
  const expense = getExpenseById(id);

  if (!expense) {
    return null;
  }

  if (updates.spentAt !== undefined) {
    expense.spentAt = updates.spentAt;
  }

  if (updates.title !== undefined) {
    expense.title = updates.title;
  }

  if (updates.amount !== undefined) {
    expense.amount = Number(updates.amount);
  }

  if (updates.category !== undefined) {
    expense.category = updates.category;
  }

  if (updates.note !== undefined) {
    expense.note = updates.note;
  }

  return expense;
};

const deleteExpense = (id) => {
  const index = expenses.findIndex((expense) => expense.id === Number(id));

  if (index !== -1) {
    expenses.splice(index, 1);

    return true;
  }

  return false;
};

const clearExpenses = () => {
  expenses = [];
  nextExpenseId = 1;
};

module.exports = {
  getAllExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense,
  clearExpenses,
};
