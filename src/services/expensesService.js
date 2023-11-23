'use strict';

const uuidv4 = require('uuidv4');

let expenses = [];

const getAllExpenses = () => {
  return expenses;
};

const getExpenseById = (expenseId) => {
  return expenses.find(expense => expense.id === expenseId) || null;
};

const updateExpense
  = (expenseId, userId, spentAt, title, amount, category, note) => {
    const expense = getExpenseById(expenseId);

    Object.assign(
      expenses,
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

const addExpense
  = (userId, spentAt, title, amount, category, note = 'empty') => {
    const newExpense = {
      id: uuidv4(),
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

const deleteExpense = (expenseId) => {
  expenses = expenses.filter(expense => expense.id !== expenseId);
};

module.exports = {
  getAllExpenses,
  getExpenseById,
  updateExpense,
  addExpense,
  deleteExpense,
};
