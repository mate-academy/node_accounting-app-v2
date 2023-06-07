'use strict';

let expenses = [];

function getAllExpenses(data) {
  const {
    userId,
    categories,
    from,
    to,
  } = data;

  if (userId) {
    expenses = expenses.filter(expense => expense.userId === +userId);
  }

  if (categories) {
    expenses = expenses.filter(({ category }) => (
      categories.includes(category)
    ));
  }

  if (from && to) {
    expenses = expenses.filter(expense => {
      const expenseDate = new Date(expense.spentAt);
      const fromDate = new Date(from);
      const toDate = new Date(to);

      return expenseDate < toDate && fromDate <= expenseDate;
    });
  };

  return expenses;
}

function findExpenseById(expenseId) {
  return expenses.find(({ id }) => id === expenseId);
}

function createExpense(expenseData) {
  const newExpenseId = expenses.length + 1;

  const newExpense = {
    id: newExpenseId,
    ...expenseData,
  };

  expenses.push(newExpense);

  return newExpense;
}

function removeExpense(expenseId) {
  expenses = expenses.filter(({ id }) => id !== Number(expenseId));

  return expenses;
}

function updateExpense(expenseId, expenseBody) {
  const expense = findExpenseById(Number(expenseId));

  if (expense) {
    Object.assign(expense, expenseBody);
  }

  return expense;
}

module.exports = {
  getAllExpenses,
  findExpenseById,
  createExpense,
  removeExpense,
  updateExpense,
};
