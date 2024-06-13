const { compareDates } = require('../utils/compareDates');
const { validateDate } = require('../utils/validateDate');
const userService = require('./user.service');

let expenses = [];

function getNextId() {
  return expenses.length ? Math.max(...expenses.map((e) => e.id)) + 1 : 1;
}

function getExpenses(userId, categories, from, to) {
  if (categories && !Array.isArray(categories)) {
    throw new Error('invalid categories');
  }

  if ((from && !validateDate(from)) || (to && !validateDate(to))) {
    throw new Error('invalid date');
  }

  return expenses.filter(
    (e) =>
      (!userId || e.userId === userId) &&
      (!categories || categories.some((c) => c === e.category)) &&
      (!from || compareDates(e.spentAt, from) >= 0) &&
      (!to || compareDates(e.spentAt, to) <= 0),
  );
}

function createExpense({
  userId,
  spentAt,
  title,
  amount,
  category,
  note = '',
}) {
  if (typeof userId !== 'number') {
    throw new Error('invalid userId');
  } else if (!userService.getUser(userId)) {
    throw new Error('user not found');
  }

  if (!validateDate(spentAt)) {
    throw new Error('invalid date');
  }

  if (typeof title !== 'string') {
    throw new Error('invalid title');
  }

  if (typeof amount !== 'number') {
    throw new Error('invalid amount');
  }

  if (typeof category !== 'string') {
    throw new Error('invalid category');
  }

  if (typeof note !== 'string') {
    throw new Error('invalid note');
  }

  const expense = {
    id: getNextId(),
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses = [...expenses, expense];

  return expense;
}

function getExpense(id) {
  return expenses.find((e) => e.id === id);
}

function deleteExpense(id) {
  let exists = false;

  expenses = expenses.filter((e) => {
    if (e.id === id) {
      exists = true;

      return false;
    }

    return true;
  });

  return exists;
}

function updateExpense(id, expenseData) {
  if (typeof expenseData !== 'object' || expenseData === null) {
    throw new Error('invalid data');
  }

  const { userId, spentAt, title, amount, category, note } = expenseData;

  if (userId && typeof userId !== 'number') {
    throw new Error('invalid userId');
  }

  if (spentAt && !validateDate(spentAt)) {
    throw new Error('invalid date');
  }

  if (title && typeof title !== 'string') {
    throw new Error('invalid title');
  }

  if (amount && typeof amount !== 'number') {
    throw new Error('invalid amount');
  }

  if (category && typeof category !== 'string') {
    throw new Error('invalid category');
  }

  if (note && typeof note !== 'string') {
    throw new Error('invalid note');
  }

  let expense;

  expenses = expenses.map((e) => {
    if (e.id === id) {
      expense = {
        ...e,
        userId: userId || e.userId,
        spentAt: spentAt || e.spentAt,
        title: title || e.title,
        amount: amount || e.amount,
        category: category || e.category,
        note: note || e.note,
      };

      return expense;
    }

    return e;
  });

  return expense;
}

function clearExpenses() {
  expenses = [];
}

module.exports = {
  getExpenses,
  createExpense,
  getExpense,
  deleteExpense,
  updateExpense,
  clearExpenses,
};
