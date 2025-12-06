const { getId, parseId } = require('../utils/getId');

let expenses = [];

const reset = () => {
  expenses = [];
};

const getAll = (query = {}) => {
  const { userId, from, to, categories } = query;

  let results = [...expenses];

  if (userId) {
    results = results.filter((expense) => expense.userId === Number(userId));
  }

  if (from) {
    const fromDate = new Date(from);

    results = results.filter(
      (expense) => new Date(expense.spentAt) >= fromDate,
    );
  }

  if (to) {
    const toDate = new Date(to);

    results = results.filter((expense) => new Date(expense.spentAt) <= toDate);
  }

  if (categories) {
    const cat = categories.toLowerCase();

    results = results.filter(
      (expense) => expense.category.toLowerCase() === cat,
    );
  }

  return results;
};

const getOne = (id) => {
  return expenses.find((expense) => expense.id === parseId(id));
};

const create = (data, user) => {
  const { spentAt, title, amount, category, note } = data;

  if (!spentAt || !title || amount === undefined || !category || !note) {
    throw new Error('Missing required fields');
  }

  const newExpense = {
    id: getId(),
    userId: user.id,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(newExpense);

  return newExpense;
};

const update = (id, data) => {
  const expense = getOne(id);

  if (expense) {
    Object.assign(expense, data);

    return expense;
  }
};

const remove = (id) => {
  const prevLen = expenses.length;

  expenses = expenses.filter((expense) => expense.id !== parseId(id));

  return prevLen > expenses.length;
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
  reset,
};
