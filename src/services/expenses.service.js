'use strict';

let expenses = [];

const reset = () => (expenses = []);

const getAll = (userId, categories, from, to) => {
  return expenses.filter((expense) => {
    const spentAt = new Date(expense.spentAt);

    return (
      (!userId || expense.userId === userId) &&
      (!categories || categories.includes(expense.category)) &&
      (!from || spentAt >= from) &&
      (!to || spentAt <= to)
    );
  });
};

const getById = (id) => expenses.find((expense) => expense.id === id);

const create = (userId, spentAt, title, amount, category, note) => {
  const id = expenses.length
    ? Math.max(...expenses.map((item) => item.id)) + 1
    : 1;

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

const remove = (id) => {
  const newExpenses = expenses.filter((user) => user.id !== id);

  if (newExpenses.length === expenses.length) {
    return false;
  }

  expenses = newExpenses;

  return true;
};

const update = (id, data) => {
  const expense = getById(id);

  if (!expense) {
    return;
  }

  Object.assign(expense, data);

  return expense;
};

module.exports = {
  reset,
  getAll,
  create,
  getById,
  remove,
  update,
};
