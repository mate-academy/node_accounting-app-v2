'use strict';

let expenses = [];

const reset = () => {
  expenses = [];
};

const getAll = (data) => {
  const { userId, categories, from, to } = data;

  return expenses.filter(
    (expense) =>
      (!userId || expense.userId === Number(userId)) &&
      (!categories || expense.category === categories) &&
      (!from || new Date(expense.spentAt) >= new Date(from)) &&
      (!to || new Date(expense.spentAt) <= new Date(to)),
  );
};

const getById = (id) => {
  return expenses.find((expense) => expense.id === Number(id)) || null;
};

const create = (data) => {
  const newExpense = {
    ...data,
    id: expenses.length,
    note: data?.note || '',
  };

  expenses.push(newExpense);

  return newExpense;
};

const update = (id, data) => {
  const updatedExpense = getById(id);

  Object.assign(updatedExpense, { ...data });

  return updatedExpense;
};

const remove = (id) => {
  expenses = expenses.filter((expense) => expense.id !== Number(id));
};

module.exports = {
  reset,
  getAll,
  getById,
  create,
  update,
  remove,
};
