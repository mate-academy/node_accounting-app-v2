'use strict';

let expenses = [];

const getAll = ({ userId, categories, from, to }) => {
  if (categories) {
    expenses = expenses.filter((exp) => {
      return categories.includes(exp.category);
    });
  }

  if (userId) {
    expenses = expenses.filter((exp) => exp.userId === +userId);
  }

  if (from && to) {
    expenses = expenses.filter((exp) => exp.spentAt >= from
    && exp.spentAt <= to);
  }

  return expenses;
};

const getById = (expenseId) => {
  const foundExpense = expenses.find(
    expense => +expense.id === +expenseId
  );

  return foundExpense || null;
};

const create = ({ userId, spentAt, title, amount, category, note }) => {
  const expenseIds = expenses.map(expense => expense.id);

  const maxId = Math.max(...expenseIds, 0) + 1;

  const newExpence = {
    id: maxId,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(newExpence);

  return newExpence;
};

const remove = (expenseId) => {
  expenses = expenses.filter(
    expense => +expense.id !== +expenseId
  );
};

const update = (id, body) => {
  const expense = getById(id);

  Object.assign(expense, body);

  return expense;
};

const removeAll = () => {
  expenses = [];
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
  removeAll,
};
