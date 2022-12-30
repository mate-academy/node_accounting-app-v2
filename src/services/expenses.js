'use strict';

let expenses = [];

const getAllExpenses = () => {
  return expenses;
};

const getExpenseById = (expenseId) => {
  const foundExpenses = expenses.find(expense => expense.id === +expenseId);

  return foundExpenses || null;
};

const createExpenses = (data) => {
  const maxId = Math.max(...expenses.map(exp => exp.id)) || 0;

  const newExpense = {
    id: maxId + 1,
    ...data,
  };

  expenses.push(newExpense);

  return newExpense;
};

const removeExpenses = (expenseId) => {
  expenses = expenses.filter(expense => expense.id !== +expenseId);
};

const updateExpenses = ({
  id,
  spentAt,
  title,
  amount,
  category,
  note,
}) => {
  const foundExpense = getExpenseById(id);

  Object.assign(foundExpense, {
    spentAt,
    title,
    amount,
    category,
    note,
  });

  return foundExpense;
};

module.exports = {
  getAllExpenses,
  getExpenseById,
  removeExpenses,
  createExpenses,
  updateExpenses,
};
