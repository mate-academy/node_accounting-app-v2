'use strict';

let expenses = [];
let nextExpensessId = 1;

const findById = (itemsArray, id) => {
  return itemsArray.find(item => item.id === +id);
};

const filterById = (itemsArray, value) => {
  return itemsArray.filter(item => item.id !== +value);
};

function initExpenses() {
  expenses = [];
}

function getAllExpenses() {
  return expenses;
};

function getExpenseById(expensesId) {
  const foundExpense = findById(expenses, expensesId);

  return foundExpense || null;
};

function createNewExpense({ userId,
  spentAt,
  title,
  amount,
  category,
  note }) {
  const newExpensess = {
    id: nextExpensessId++,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(newExpensess);

  return newExpensess;
};

function removeExpenses(expensesId) {
  expenses = filterById(expenses, expensesId);
};

function updateExpenses({ expensesId, title }) {
  const expense = getExpenseById(expensesId);

  Object.assign(expense, { title });

  return expense;
}

module.exports = {
  getAllExpenses,
  getExpenseById,
  updateExpenses,
  removeExpenses,
  createNewExpense,
  initExpenses,
};
