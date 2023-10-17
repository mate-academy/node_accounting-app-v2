'use strict';

let expenses = [];
let lastId = 0;

const clear = () => {
  expenses = [];
};

const getAll = () => {
  return expenses;
};

const getById = (id) => {
  return expenses.find(expense => expense.id === id);
};

const create = ({
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
}) => {
  const expense = {
    id: ++lastId,
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
  expenses = expenses.filter(expense => expense.id !== id);
};

const update = (id, {
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
}) => {
  const expense = expenses.find(item => item.id === id);
  const fields = {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  if (!expense) {
    return;
  }

  for (const key in fields) {
    if (fields[key]) {
      expense[key] = fields[key];
    }
  }

  return expense;
};

const ExpenseService = {
  getAll,
  getById,
  create,
  remove,
  update,
  clear,
};

module.exports = {
  ExpenseService,
};
