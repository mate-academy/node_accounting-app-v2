'use strict';

let expenses = [];

const getAllExp = ({ userId, from, to, categories }) => {
  if (userId) {
    expenses = expenses.filter(expense => (
      expense.userId === +userId
    ));
  }

  if (categories) {
    expenses = expenses.filter(expense => expense.category === categories);
  }

  if (from) {
    expenses = expenses.filter(exp => exp.spentAt >= from);
  }

  if (to) {
    expenses = expenses.filter(exp => exp.spentAt <= to);
  }

  return expenses;
};

const getExpById = (expenseId) => {
  const foundExpense = expenses.find(
    expense => expense.id === +expenseId
  );

  return foundExpense || null;
};

const createExp = ({ userId, spentAt, title, amount, category, note }) => {
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

const removeExp = (expenseId) => {
  expenses = expenses.filter(exp => exp.id !== +expenseId);
};

const updateExp = (expenseId, body) => {
  const foundExpense = getExpById(expenseId);

  Object.assign(foundExpense, body);

  return foundExpense;
};

const removeAll = () => {
  expenses = [];
};

module.exports = {
  getAllExp,
  getExpById,
  createExp,
  removeExp,
  updateExp,
  removeAll,
};
