'use strict';

let expenses = [];

// beforeEach(() => {
//   expenses = [];
// });

const getAllExpenses = () => {
  return expenses;
};

const getExpenseById = (expenseId) => {
  const expenseById = expenses.find((expense) => expense.id === expenseId);

  return expenseById || null;
};

const createExpense = (id, userId, spentAt, title, amount, category, note) => {
  const idCount = expenses.length;
  const newExpense = {
    id: idCount + 10,
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
  expenses = expenses.filter((expense) => expense.id !== expenseId);
};

// const updateExpense = (
//   expenseId,
//   userId,
//   spentAt,
//   title,
//   amount,
//   category,
//   note
// ) => {};

module.exports = {
  getAllExpenses,
  getExpenseById,
  createExpense,
  deleteExpense,
  //   updateExpense,
};
