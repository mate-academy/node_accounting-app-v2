'use strict';

let expenses = [];

const resetExpenses = () => {
  expenses = [];
};

const getExpenses = (userId, categories, from, to) => {
  let filteredExpenses = [...expenses];

  if (userId) {
    filteredExpenses = filteredExpenses
      .filter((el) => el.userId === +userId);
  }

  if (categories) {
    filteredExpenses = filteredExpenses
      .filter((el) => categories.includes(el.category));
  }

  if (from) {
    filteredExpenses = filteredExpenses
      .filter((el) => new Date(el.spentAt) >= new Date(from));
  }

  if (to) {
    filteredExpenses = filteredExpenses
      .filter((el) => new Date(el.spentAt) <= new Date(to));
  }

  return filteredExpenses;
};

const getExpenseById = (id) => {
  return expenses.find((expense) => expense.id === +id);
};

const createExpense = (userId, spentAt, title, amount, category, note) => {
  const id = expenses.length;
  const expense = {
    id,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(expense);

  return expense;
};

const updateExpense = (id, spentAt, title, amount, category, note) => {
  const index = expenses.findIndex((el) => el.id === +id);

  if (index === -1) {
    return null;
  }

  const expense = expenses[index];

  Object.assign(expense, {
    spentAt: spentAt !== undefined ? spentAt : expense.spentAt,
    title: title !== undefined ? title : expense.title,
    amount: amount !== undefined ? amount : expense.amount,
    category: category !== undefined ? category : expense.category,
    note: note !== undefined ? note : expense.note,
  });

  return expense;
};

const deleteExpense = (id) => {
  const index = expenses.findIndex((el) => el.id === +id);

  if (index === -1) {
    return null;
  }

  expenses.splice(index, 1);

  return true;
};

module.exports = {
  getExpenses,
  getExpenseById,
  deleteExpense,
  createExpense,
  updateExpense,
  resetExpenses,
};
