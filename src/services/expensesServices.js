'use strict';

const expenses = [];

const getExpenses = () => expenses;

const getExpense = (expId) => expenses.find(exp => exp.id === expId);

const createExpense = (newExpense) => expenses.push(newExpense);

const expenseIndex = (id) => expenses.findIndex(exp => exp.id === id);

const updateExpense = (index, userId, spentAt, title, amount, category, note) =>
  (
    expenses[index] = {
      ...expenses[index],
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    }
  );

const deleteExpense = (index) => expenses.splice(index, 1);

const getId = () => Math.max(...expenses.map(exp => exp.id)) + 1;

const expenseServices = {
  getExpenses,
  getExpense,
  createExpense,
  expenseIndex,
  updateExpense,
  deleteExpense,
  getId,
};

module.exports = {
  expenseServices,
};
