'use strict';

let expenses = [];

const getExpenses = ({ userId, categories, from, to }) => {
  if (userId) {
    expenses = expenses.filter(expense => +expense.userId === +userId);
  }

  if (categories) {
    const categoriesCheck = Array.isArray(categories)
      ? categories
      : [categories];

    expenses = expenses
      .filter(expense => categoriesCheck.includes(expense.category));
  }

  if (from) {
    expenses = expenses.filter(expense => expense.spentAt >= from);
  }

  if (to) {
    expenses = expenses.filter(expense => expense.spentAt <= to);
  }

  return expenses;
};

const getById = id => expenses.find(expense => expense.id === Number(id));

const add = (expense) => {
  expenses.push(expense);
};

const update = (id, toupdate) => {
  const expense = getById(id);

  if (!expense) {
    return;
  }

  Object.assign(expense, toupdate);

  return expense;
};

const remove = (id) => {
  expenses = expenses.filter(person => person.id !== Number(id));
};

const clear = () => {
  expenses = [];
};

module.exports = {
  getById,
  add,
  getExpenses,
  update,
  clear,
  remove,
};
