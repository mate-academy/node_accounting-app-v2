'use strict';

let expenses = [];

const getExpenses = ({ userId, categories, from, to }) => {
  return expenses
    .filter(expense => !userId
      || expense.userId === +userId)
    .filter(expense => !categories
      || categories.includes(expense.category))
    .filter(expense => (!from && !to)
      || (expense.spentAt >= from && expense.spentAt <= to));
};

const createExpense = (newExpense) => {
  Object.assign(newExpense, { id: Date.now() });
  expenses.push(newExpense);

  return newExpense;
};

const getExpenseById = (expenseId) => {
  return expenses.find(expense => expense.id === expenseId);
};

const deleteExpense = (expenseId) => {
  expenses = expenses.filter(({ id }) => id !== expenseId);
};

const updateExpense = (id, propertiesToUpdate) => {
  const expense = getExpenseById(id);

  Object.assign(expense, propertiesToUpdate);

  return expense;
};

const clearExpenses = () => {
  expenses = [];
};

module.exports = {
  getExpenses,
  createExpense,
  getExpenseById,
  deleteExpense,
  updateExpense,
  clearExpenses,
};
