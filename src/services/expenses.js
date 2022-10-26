'use strict';

let expenses = [];

const newId = () => (
  expenses.length
    ? [...expenses.sort((a, b) => b.id - a.id)][0].id + 1
    : 1
);

const filterByUserId = (userId) => (
  expenses
    .filter(expense => expense.userId === +userId)
);

const filterByCategoty = (category, filterExpenses) => (
  filterExpenses
    .filter(expense => expense.category === category)
);

const filterByDate = (from, to) => (
  expenses
    .filter(expense => expense.spentAt > from && expense.spentAt < to)
);

const getAll = (from, to, category, userId) => {
  let filterExpenses;

  if (userId) {
    filterExpenses = filterByUserId(userId);

    if (category) {
      filterExpenses = filterByCategoty(category, filterExpenses);
    }

    expenses = filterExpenses;
  }

  if (from && to) {
    filterExpenses = filterByDate(from, to);

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
    id: newId(),
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
