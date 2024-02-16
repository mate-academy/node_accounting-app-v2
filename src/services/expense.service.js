'use strict';

let expenses = [];

const initExpenses = () => {
  expenses = [];
};

const get = ({ userId, categories, from, to }) => {
  let filteredExpenses = [...expenses];

  if (userId) {
    filteredExpenses = filteredExpenses.filter(
      expense => expense.userId === +userId);
  }

  if (categories) {
    filteredExpenses = filteredExpenses.filter(
      expense => expense.category === categories);
  }

  if (from && to) {
    const fromDate = new Date(from);
    const toDate = new Date(to);

    filteredExpenses = filteredExpenses.filter(expense => {
      const spentAt = new Date(expense.spentAt);

      return spentAt >= fromDate && spentAt <= toDate;
    });
  }

  return filteredExpenses;
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
  const newExpense = {
    id: expenses.length + 1,
    userId,
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
  const expense = getById(id);

  Object.assign(expense, { ...data });

  return expense;
};

const remove = (id) => {
  expenses = expenses.filter(expense => expense.id !== id);
};

module.exports = {
  initExpenses,
  get,
  getById,
  create,
  update,
  remove,
};
