'use strict';

let expenses = [];

const getExpenses = () => {
  return expenses;
};

const getExpense = (id) => {
  return expenses.find(expense => expense.id === +id) || null;
};

const addExpense = ({
  userId, spentAt, title, amount, category, note,
}) => {
  const newExpense = {
    id: expenses.length + 1,
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

const deleteExpense = (id) => {
  expenses = expenses.filter(expense => expense.id !== +id);
};

const updateExpenseById = (id, body) => {
  const expense = getExpense(id);

  Object.assign(expense, body);
};

const clearExpenses = () => {
  expenses = [];
};

module.exports = {
  clearExpenses,
  addExpense,
  deleteExpense,
  getExpense,
  getExpenses,
  updateExpenseById,
};
