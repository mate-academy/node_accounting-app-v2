'use strict';

let expenses = [];

const reset = () => {
  expenses = [];
};

const getAll = (data) => {
  const { userId, categories, from, to } = data;
  let filteredExpenses = expenses;

  if (userId) {
    filteredExpenses = filteredExpenses.filter(
      (expense) => expense.userId === Number(userId),
    );
  }

  if (categories) {
    filteredExpenses = filteredExpenses.filter(
      (expense) => expense.category === categories,
    );
  }

  if (from) {
    filteredExpenses = filteredExpenses.filter((expense) => {
      return new Date(expense.spentAt) >= new Date(from);
    });
  }

  if (to) {
    filteredExpenses = filteredExpenses.filter((expense) => {
      return new Date(expense.spentAt) <= new Date(to);
    });
  }

  return filteredExpenses;
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
