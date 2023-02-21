'use strict';

const createExpenseId = () => {
  return Math.max(...expenses.map(expense => +expense.id), 0) + 1;
};

let expenses = [
  {
    id: 0,
    userId: 0,
    spentAt: '2023-02-21T15:32:52.235Z',
    title: 'string',
    amount: 0,
    category: 'string',
    note: 'string',
  },
];

const resetExpenses = () => {
  expenses = [];
};

const getExpenses = (params) => {
  const { userId, category, from, to } = params;

  if (!expenses.length) {
    return [];
  }

  let filteredExpenses = expenses;

  if (userId) {
    filteredExpenses = filteredExpenses
      .filter(expense => expense.userId === +userId);
  }

  if (category) {
    filteredExpenses = filteredExpenses
      .filter(expense => expense.category === category);
  }

  if (from) {
    filteredExpenses = filteredExpenses
      .filter(expense => expense.spentAt >= from);
  }

  if (to) {
    filteredExpenses = filteredExpenses
      .filter(expense => expense.spentAt <= to);
  }

  return filteredExpenses;
};

const createExpense = (expense) => {
  const newExpense = {
    ...expense,
    id: createExpenseId(),
  };

  expenses.push(newExpense);

  return newExpense;
};

const getExpensesById = (expenseId) => {
  return expenses.find(expense => expense.id === +expenseId) || null;
};

const deleteExpense = (expenseId) => {
  expenses = expenses.dilter(expense => expense.id !== +expenseId);
};

const updateExpense = (id, params) => {
  const expense = getExpensesById(id);

  Object.assign(expense, params);

  return expense;
};

module.exports = {
  getExpenses,
  createExpense,
  getExpensesById,
  deleteExpense,
  updateExpense,
  resetExpenses,
};
