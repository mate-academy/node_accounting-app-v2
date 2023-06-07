'use strict';

let expenses = [];

function resetExpenses() {
  expenses = [];
};

function getExpenses(userId, categories, from, to) {
  let filteredExpenses = expenses;

  if (userId) {
    filteredExpenses = filteredExpenses.filter(
      (expense) => expense.userId === Number(userId)
    );
  }

  if (categories) {
    filteredExpenses = filteredExpenses.filter((expense) =>
      categories.includes(expense.category)
    );
  }

  if (from && to) {
    filteredExpenses = filteredExpenses.filter(expense => {
      const expenseDate = new Date(expense.spentAt);
      const fromDate = new Date(from);
      const toDate = new Date(to);

      return expenseDate < toDate && fromDate <= expenseDate;
    });
  }

  return filteredExpenses;
};

function getExpenseById(id) {
  const foundExpense = expenses.find((expense) => expense.id === Number(id));

  return foundExpense;
};

function createExpense(userId, spentAt, title, amount, category, note) {
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

function deleteExpense(id) {
  expenses = expenses.filter(expense => expense.id !== Number(id));
};

function updateExpense(expense, req) {
  Object.assign(expense, req.body);

  return expense;
};

module.exports = {
  getExpenses,
  getExpenseById,
  createExpense,
  deleteExpense,
  updateExpense,
  resetExpenses,
};
