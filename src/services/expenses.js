'use strict';

let expenses = [];
let currentId = 1;

const getAll = ({ userId, categories, from, to }) => {
  if (categories) {
    expenses = expenses.filter((exp) => {
      return categories.includes(exp.category);
    });
  }

  if (userId) {
    expenses = expenses.filter((exp) => {
      return exp.userId === +userId;
    });
  }

  if (from && to) {
    expenses = expenses.filter((exp) => {
      return exp.spentAt >= from && exp.spentAt <= to;
    });
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
  const newExpence = {
    id: currentId,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(newExpence);
  currentId++;

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
