'use strict';

let expenses = [];

const clearExpense = () => {
  expenses = [];
};

const getAll = () => {
  return expenses;
};

const getById = (id) => {
  return expenses.find((expense) => expense.id === id);
};

const postExpenses = ({
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
}) => {
  const expense = {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
    id: +new Date(),
  };

  expenses.push(expense);

  return expense;
};

const update = ({
  id,
  spentAt,
  title,
  amount,
  category,
  note,
}) => {
  const expense = getById(id);

  Object.assign(expense, {
    spentAt,
    title,
    amount,
    category,
    note,
  });
};

const remove = (id) => {
  expenses = expenses.filter(expense => expense.id !== id);
};

module.exports = {
  getAll,
  getById,
  postExpenses,
  update,
  remove,
  clearExpense,
};
