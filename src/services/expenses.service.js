/* eslint-disable no-param-reassign */
'use strict';

let expenses = [];

const clearExpenses = () => {
  expenses.length = 0;
};

const getExpenses = (userId, from, to, categories) => {
  let filteredExpenses = [...expenses];

  if (userId) {
    filteredExpenses = expenses.filter((e) => e.userId === +userId);
  }

  if (from && to) {
    filteredExpenses = expenses.filter((expense) => {
      const expenseDate = new Date(expense.spentAt);
      const fromDate = new Date(from);
      const toDate = new Date(to);

      return expenseDate >= fromDate && expenseDate <= toDate;
    });
  }

  if (categories) {
    filteredExpenses = expenses.filter(
      (expense) => expense.category === categories
    );
  }

  return filteredExpenses;
};

const getExpensesById = (id) => {
  const userExpens = expenses.find((e) => e.id === +id);

  return userExpens;
};

const createExpense = (newExpense) => {
  const { userId, spentAt, title, amount, category, note } = newExpense;

  const expens = {
    id:
      expenses.length > 0
        ? +expenses[expenses.length - 1].id + 1
        : expenses.length + 1,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(expens);

  return expens;
};

const changeExpense = (id, updateExpense) => {
  expenses = expenses.map((expens) => {
    if (expens.id === +id) {
      expens = {
        ...expens,
        ...updateExpense,
      };

      return expens;
    }

    return expens;
  });

  const changedExpens = expenses.find((e) => e.id === +id);

  return changedExpens;
};

const deleteExpense = (id) => {
  expenses = expenses.filter((e) => e.id !== +id);
};

module.exports = {
  clearExpenses,
  getExpenses,
  getExpensesById,
  createExpense,
  changeExpense,
  deleteExpense,
};
