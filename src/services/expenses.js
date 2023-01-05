'use strict';

let expenses = [];

const getAllExpenses = () => {
  return expenses;
};

const getExpenseById = (expenseId) => {
  const foundUser = expenses.find(expense => expense.id === expenseId);

  return foundUser || null;
};

const addNewExpense = (
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
) => {
  const id = Math.max(0, ...expenses.map(expense => expense.id)) + 1;
  const newExpense = {
    id,
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

const deleteExpenseById = (expenseId) => {
  expenses = expenses.filter(expense => expense.id !== expenseId);
};

const updateExpenseById = (
  expenseId,
  dataToUpdate,
) => {
  const foundExpense = getExpenseById(expenseId);

  Object.assign(foundExpense, dataToUpdate);

  return foundExpense;
};

module.exports = {
  getAllExpenses,
  getExpenseById,
  addNewExpense,
  deleteExpenseById,
  updateExpenseById,
};
