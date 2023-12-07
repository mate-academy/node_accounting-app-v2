'use strict';

const { getNewId } = require('./services');
const { getAllUsers } = require('./user.service');

let expenses = [];

const getAllExpenses = (userId, from, to, categories) => {
  let visibleExpenses = [...expenses];

  if (userId) {
    visibleExpenses = visibleExpenses
      .filter(expense => expense.userId === +userId);
  }

  if (categories) {
    visibleExpenses = visibleExpenses.filter(expense =>
      expense.category === categories);
  }

  if (from && to) {
    const fromDate = new Date(from);
    const toDate = new Date(to);

    visibleExpenses = visibleExpenses.filter(expense => {
      const spentAtDate = new Date(expense.spentAt);

      return spentAtDate >= fromDate && spentAtDate <= toDate;
    });
  }

  return visibleExpenses;
};

const getExpense = id => expenses.find(expense => expense.id === +id);

const addExpense = (
  userId,
  spentAt,
  title,
  amount,
  category,
  note
) => {
  const users = getAllUsers();
  const foundUser = users.find(user => user.id === userId);

  if (!foundUser || !title) {
    return;
  }

  const newExpense = {
    id: getNewId(expenses),
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

const removeExpense = (id) => {
  const newExpenses = expenses.filter(expense => expense.id !== +id);

  if (expenses.length === newExpenses.length) {
    return;
  }

  expenses = newExpenses;

  return expenses;
};

const updateExpense = (
  id,
  spentAt,
  title,
  amount,
  category,
  note
) => {
  const foundExpense = expenses.find(expense => expense.id === +id);

  if (!foundExpense) {
    return;
  }

  const updatedExpense = {
    ...foundExpense,
    spentAt: spentAt || foundExpense.spentAt,
    title: title || foundExpense.title,
    amount: amount || foundExpense.amount,
    category: category || foundExpense.category,
    note: note || foundExpense.note,
  };

  expenses = expenses.map(expense => {
    return expense.id === +id
      ? updatedExpense
      : expense;
  });

  return updatedExpense;
};

const clearExpenses = () => {
  expenses = [];
};

module.exports = {
  getAllExpenses,
  getExpense,
  addExpense,
  removeExpense,
  updateExpense,
  clearExpenses,
};
