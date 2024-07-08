'use strict';

let expenses = [];

const reset = () => {
  expenses = [];
};

const getAll = ({ userId, categories, from, to }) => {
  let filteredExpenses = expenses;

  if (userId) {
    const userIdNum = Number(userId);

    filteredExpenses = filteredExpenses.filter(
      (exp) => exp.userId === userIdNum,
    );
  }

  if (categories) {
    filteredExpenses = filteredExpenses.filter(
      (exp) => exp.category === categories,
    );
  }

  if (from) {
    const fromDate = new Date(from);

    filteredExpenses = filteredExpenses.filter(
      (exp) => new Date(exp.spentAt) >= fromDate,
    );
  }

  if (to) {
    const toDate = new Date(to);

    filteredExpenses = filteredExpenses.filter(
      (exp) => new Date(exp.spentAt) <= toDate,
    );
  }

  return filteredExpenses;
};

const getById = (id) => {
  const idNum = Number(id);

  return expenses.find((exp) => exp.id === idNum) ?? null;
};

const create = (data) => {
  const newId = expenses.length ? expenses[expenses.length - 1].id + 1 : 1;
  const newExpense = {
    id: newId,
    ...data,
    note: data?.note ?? '',
  };

  expenses.push(newExpense);

  return newExpense;
};

const updateById = (id, data) => {
  const expense = getById(id);

  if (!expense) {
    throw new Error('Expense not found');
  }

  Object.assign(expense, data);

  return expense;
};

const removeById = (id) => {
  const idNum = Number(id);

  expenses = expenses.filter((exp) => exp.id !== idNum);
};

module.exports = {
  getAll,
  create,
  getById,
  removeById,
  updateById,
  reset,
};
