'use strict';

let expenses = [];

const getAllExp = ({ userId, categories, from, to }) => {
  let filteredExpenses = expenses;

  if (userId) {
    filteredExpenses = filteredExpenses.filter(
      (expense) => expense.userId === Number(userId)
    );
  };

  if (categories) {
    const categoryList = Array.isArray(categories)
      ? categories
      : [categories];

    filteredExpenses = filteredExpenses.filter(
      (expense) => categoryList.includes(expense.category)
    );
  }

  if (from) {
    filteredExpenses = filteredExpenses.filter(
      (expense) => new Date(expense.spentAt) >= new Date(from)
    );
  }

  if (to) {
    filteredExpenses = filteredExpenses.filter(
      (expense) => new Date(expense.spentAt) <= new Date(to)
    );
  }

  return filteredExpenses;
};

const addNewExpense = ({ userId, spentAt, title, amount, category, note }) => {
  const newExpense = {
    id: Math.floor(Math.random() * 10000),
    userId: Number(userId),
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(newExpense);

  return newExpense;
};

const findExpense = (expenseId) => (expenses.find(
  (expense) => expense.id === Number(expenseId)
));

const findIndex = (expenseId) => (expenses.findIndex(
  (expense) => expense.id === Number(expenseId)
));

const deleteExp = (index) => expenses.splice(index, 1);

const findExp = (expenseId) => (
  expenses.find(
    (expense) => expense.id === Number(expenseId)
  )
);

const updateExp = ({
  foundExpense, spentAt, title, amount, category, note,
}) => {
  if (spentAt) {
    foundExpense.spentAt = spentAt;
  };

  if (title) {
    foundExpense.title = title;
  };

  if (amount) {
    foundExpense.amount = amount;
  };

  if (category) {
    foundExpense.category = category;
  };

  if (note) {
    foundExpense.note = note;
  };

  return foundExpense;
};

const makeExpensesEmpty = () => {
  expenses = [];
};

module.exports = {
  getAllExp,
  addNewExpense,
  findExpense,
  findIndex,
  deleteExp,
  findExp,
  updateExp,
  makeExpensesEmpty,
};
