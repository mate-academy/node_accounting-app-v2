'use strict';

let expenses = [];
let currentId = 1;

const getExpenses = ({
  userId,
  categories,
  from,
  to,
}) => {
  if (categories) {
    expenses = expenses.filter((expens) => {
      return categories.includes(expens.category);
    });
  }

  if (userId) {
    expenses = expenses.filter(
      expens => expens.userId === +userId
    );
  }

  if (from && to) {
    expenses = expenses.filter(expens => {
      return expens.spentAt >= from && expens.spentAt <= to;
    });
  }

  return expenses;
};

const getExpense = (expensesId) => {
  const foundExpens = expenses.find(
    expens => expens.id === +expensesId
  );

  return foundExpens || null;
};

const createExpense = ({
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
}) => {
  const newExpens = {
    id: currentId,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(newExpens);
  currentId++;

  return newExpens;
};

const updateExpense = (expensesId, body) => {
  const expens = getExpense(expensesId);

  Object.assign(expens, body);

  return expens;
};

const deleteExpense = (expensesId) => {
  expenses = expenses.filter(
    expens => expens.id !== +expensesId
  );
};

const removeAll = () => {
  expenses = [];
};

module.exports = {
  getExpenses,
  getExpense,
  createExpense,
  updateExpense,
  deleteExpense,
  removeAll,
};
