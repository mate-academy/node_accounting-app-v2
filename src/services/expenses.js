'use strict';

let expenses = [];

const getAll = (from, to, category, userId) => {
  if (userId) {
    let filterExpenses = expenses
      .filter(expense => expense.userId === +userId);

    if (category) {
      filterExpenses = filterExpenses
        .filter(expense => expense.category === category);
    }

    expenses = filterExpenses;
  }

  if (from && to) {
    const filterExpenses = expenses
      .filter(expense => expense.spentAt > from && expense.spentAt < to);

    expenses = filterExpenses;
  }

  return expenses;
};

const getById = (expenseId) => {
  const foundExpense = expenses
    .find(expense => expense.userId === +expenseId);

  return foundExpense || null;
};

const create = (title, amount, category, note, userId, spentAt) => {
  const newExpense = {
    title,
    amount,
    category,
    note,
    userId,
    id: expenses.length
      ? [...expenses.sort((a, b) => b.id - a.id)][0].id + 1
      : 1,
    spentAt,
  };

  expenses.push(newExpense);

  return newExpense;
};

const remove = (expenseId) => {
  expenses = expenses
    .filter(expense => expense.id !== +expenseId);
};

const update = (
  expenseId,
  spentAt,
  title,
  amount,
  category,
  note,
) => {
  const expense = getById(expenseId);

  Object.assign(expense, {
    spentAt: spentAt || expense.spentAt,
    title: title || expense.title,
    amount: amount || expense.amount,
    category: category || expense.category,
    note: note || expense.note,
  });

  return expense;
};

const reset = () => {
  expenses = [];
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
  reset,
};
