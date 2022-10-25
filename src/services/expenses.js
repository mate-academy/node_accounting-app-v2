'use strict';

let nextExpenseId = 1;

let expenses = [];

const getExpensesData = () => {
  return expenses;
};

const clearExpensesArray = () => {
  expenses = [];
};

function postExpense(body) {
  const expense = {
    id: nextExpenseId++,
    ...body,
  };

  expenses.push(expense);

  return expense;
}

function getExpenses(query) {
  const { userId, category, from, to } = query;
  const numberFromDate = new Date(from).getTime();
  const numberToDate = new Date(to).getTime();
  let copy = [ ...expenses ];

  if (userId) {
    copy = copy.filter(expense => expense.userId === +userId);
  }

  if (category) {
    copy = copy.filter(expense => expense.category === category);
  }

  if (from && to) {
    copy = copy.filter(expense => {
      const expenseDate = new Date(expense.spentAt).getTime();

      return expenseDate < numberToDate && expenseDate > numberFromDate;
    });
  }

  return copy;
}

function getExpenseById(expenseId) {
  const foundExpense = expenses.find(expense => expense.id === +expenseId);

  return foundExpense || null;
}

function deleteExpense(expenseId) {
  const newExpenses = expenses.filter(expense => expense.id !== +expenseId);

  expenses = newExpenses;

  return newExpenses;
}

function updateExpense(foundExpense, title) {
  Object.assign(foundExpense, { title });
}

module.exports = {
  postExpense,
  getExpenseById,
  getExpenses,
  deleteExpense,
  updateExpense,
  getExpensesData,
  clearExpensesArray,
};
