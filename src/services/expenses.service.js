const { dateComparer } = require('../utils/dateComparer');
const { dateValidator } = require('../utils/dateValidator');
const userService = require('./users.service');

let expenses = [];

const getId = () => {
  return expenses.length ? Math.floor(Math.random() * 2137) : 1;
};

const getExpenses = (userId, categories, from, to) => {
  if (categories && !Array.isArray(categories)) {
    throw new Error('invalid categories');
  }

  if ((from && !dateValidator(from)) || (to && !dateValidator(to))) {
    throw new Error('invalid date');
  }

  return expenses.filter(
    (e) =>
      (!userId || e.userId === userId) &&
      (!categories || categories.some((c) => c === e.category)) &&
      (!from || dateComparer(e.spentAt, from) >= 0) &&
      (!to || dateComparer(e.spentAt, to) <= 0),
  );
};

const addExpense = ({
  userId,
  spentAt,
  title,
  amount,
  category,
  note = '',
}) => {
  if (typeof userId !== 'number') {
    throw new Error('invalid userId');
  } else if (!userService.getUser(userId)) {
    throw new Error('user not found');
  }

  if (!dateValidator(spentAt)) {
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
    id: getId(),
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses = [...expenses, expense];

  return expense;
};

const getExpense = (id) => {
  return expenses.find((e) => e.id === id);
};

const deleteExpense = (id) => {
  let exists = false;

  expenses = expenses.filter((e) => {
    if (e.id === id) {
      exists = true;

      return false;
    }

    return true;
  });

  return exists;
};

const updateExpense = (id, expenseData) => {
  if (typeof expenseData !== 'object' || expenseData === null) {
    throw new Error('invalid data');
  }

  const { userId, spentAt, title, amount, category, note } = expenseData;

  if (userId && typeof userId !== 'number') {
    throw new Error('invalid userId');
  }

  if (spentAt && !dateValidator(spentAt)) {
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
};

const deleteExpenses = () => {
  expenses = [];
};

module.exports = {
  getExpenses,
  getExpense,
  deleteExpense,
  deleteExpenses,
  addExpense,
  updateExpense,
};
