'use strict';

let expenses = [];

const getAll = ({ query }) => {
  const { userId, from, to, categories } = query;

  if (userId) {
    expenses = expenses
      .filter(expense => expense.userId === Number(userId));
  }

  if (categories) {
    expenses = expenses
      .filter(expense => categories.includes(expense.category));
  }

  if (from) {
    const fromDate = new Date(from);

    expenses = expenses
      .filter(expense => {
        const spentAtDate = new Date(expense.spentAt);

        return fromDate <= spentAtDate;
      });
  }

  if (to) {
    const toDate = new Date(to);

    expenses = expenses
      .filter(expense => {
        const spentAtDate = new Date(expense.spentAt);

        return toDate >= spentAtDate;
      });
  }

  return expenses;
};

const addNewExpense = (body) => {
  const expense = {
    id: +new Date().getTime(),
    ...body,
  };

  expenses.push(expense);

  return expense;
};

const getExpense = (id) => {
  return expenses.find(item => item.id === Number(id));
};

const removeExpense = (id) => {
  expenses = expenses.filter(item => item.id !== Number(id));
};

const updateExpense = (id, body) => {
  const expense = getExpense(id);

  if (!expense) {
    return;
  }

  return Object.assign(expense, body);
};
const clear = () => {
  expenses.length = 0;
};

module.exports = {
  getAll,
  addNewExpense,
  getExpense,
  removeExpense,
  clear,
  updateExpense,
};
