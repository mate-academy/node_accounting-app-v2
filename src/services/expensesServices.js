'use strict';

const getNewId = require('../helper.js');
let expenses = [];

const getAllExpenses = () => expenses;

const getExpensesById = (expenseId) => {
  return expenses.find(e => e.id === expenseId);
};

const postExpense = (
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
) => {
  const newExpenseId = getNewId(expenses);
  const newExpense = {
    id: newExpenseId.toString(),
    userId,
    spentAt: new Date(),
    title,
    amount,
    category,
    note,
  };

  expenses.push(newExpense);

  return newExpense;
};

const updateExpense = (
  expenseId, userId, spentAt, title, amount, category, note
) => {
  const expense = getExpensesById(expenseId);

  Object.assign(
    expense,
    {
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    },
  );

  return expense;
};

const deleteExpense = (expenseId) => {
  expenses = expenses.filter(exp => exp.id !== expenseId);
};

module.exports = {
  getAllExpenses,
  getExpensesById,
  postExpense,
  deleteExpense,
  updateExpense,
};
