'use strict';

const { findUser } = require('./usersServices');

let expenses = [];

const getExpenses = (userIdQuery, categoriesQuery, fromQuery, toQuery) => {
  let filteredExpenses = expenses;

  if (userIdQuery) {
    const id = Number(userIdQuery);

    filteredExpenses = filteredExpenses.filter(
      (expense) => expense.userId === id
    );
  }

  if (categoriesQuery) {
    const categories = categoriesQuery.split(',');

    filteredExpenses = filteredExpenses.filter((expense) =>
      categories.includes(expense.category)
    );
  }

  if (fromQuery || toQuery) {
    const fromDate = fromQuery ? new Date(fromQuery) : new Date(0);
    const toDate = toQuery ? new Date(toQuery) : new Date();

    filteredExpenses = filteredExpenses.filter((expense) => {
      const expenseDate = new Date(expense.spentAt);

      return expenseDate >= fromDate && expenseDate <= toDate;
    });
  }

  return filteredExpenses;
};

const createExpense = (userId, spentAt, title, amount, category, note) => {
  if (!userId || !spentAt || !title || !amount || !category || !note) {
    throw new Error('Data not valid.');
  }

  if (!findUser(Number(userId))) {
    throw new Error('User not found.');
  }

  const newExpense = {
    id: Date.now(),
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

const getExpense = (id) => {
  const wantedExpense = expenses.find((expense) => expense.id === Number(id));

  if (!wantedExpense) {
    throw new Error('Expense not found.');
  }

  return wantedExpense;
};

const deleteExpense = (id) => {
  const indexToDelete = expenses.findIndex(
    (expense) => expense.id === Number(id)
  );

  if (indexToDelete === -1) {
    throw new Error('Expense not found.');
  }

  expenses.splice(indexToDelete, 1);
};

const updateExpense = (id, spentAt, title, amount, category, note) => {
  const expenseToUpdate = expenses.find((expense) => expense.id === Number(id));

  if (!expenseToUpdate) {
    throw new Error('Expense not found.');
  }

  if (spentAt || title || amount || category || note) {
    if (title) {
      expenseToUpdate.title = title;
    }

    if (amount) {
      expenseToUpdate.amount = amount;
    }

    if (category) {
      expenseToUpdate.category = category;
    }

    if (note) {
      expenseToUpdate.note = note;
    }

    return expenseToUpdate;
  }

  throw new Error('Incomplete data provided.');
};

const resetExpenses = () => {
  expenses = [];
};

module.exports = {
  getExpenses,
  createExpense,
  getExpense,
  deleteExpense,
  updateExpense,
  resetExpenses,
};
