'use strict';

const START_ID = 100;

let currId = START_ID;
let expenses = [];

const getAll = ({ userId, categories, from, to }) => {
  const fromDate = from ? new Date(from) : null;
  const toDate = to ? new Date(to) : null;

  return expenses.filter((expense) => {
    const isUserMatch = userId ? expense.userId === Number(userId) : true;

    const isCategoryMatch = categories
      ? Array.isArray(categories)
        ? categories.includes(expense.category)
        : categories === expense.category
      : true;

    let isDateMatch = true;
    const expenseDate = new Date(expense.spentAt);

    if (fromDate && toDate) {
      isDateMatch = expenseDate >= fromDate && expenseDate <= toDate;
    } else if (fromDate) {
      isDateMatch = expenseDate >= fromDate;
    } else if (toDate) {
      isDateMatch = expenseDate <= toDate;
    }

    return isUserMatch && isCategoryMatch && isDateMatch;
  });
};

const create = ({ userId, spentAt, title, amount, category, note }) => {
  const expense = {
    id: currId++,
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

const getById = (id) => {
  const expense = expenses.find(
    (currentExpense) => currentExpense.id === Number(id),
  );

  return expense ?? null;
};

const remove = (id) => {
  const newExpenses = expenses.filter((expense) => expense.id !== Number(id));

  expenses = newExpenses;

  return expenses;
};

const update = ({ id, spentAt, title, amount, category, note }) => {
  const expense = getById(id);

  if (!expense) {
    return;
  }

  return Object.assign(expense, {
    spentAt: spentAt ?? expense.spentAt,
    title: title ?? expense.title,
    amount: amount ?? expense.amount,
    category: category ?? expense.category,
    note: note ?? expense.note,
  });
};

const reset = () => {
  expenses = [];
  currId = START_ID;
};

module.exports = {
  getAll,
  create,
  getById,
  remove,
  update,
  reset,
};
