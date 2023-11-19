'use strict';

let expenses = [];

const getByQuery = (searchQuery) => {
  if (!searchQuery) {
    return expenses;
  } else {
    let filteredExpenses = expenses;

    if (searchQuery.categories) {
      filteredExpenses = [...filteredExpenses].filter(item =>
        item.category === String(searchQuery.categories));
    }

    if (searchQuery.userId) {
      filteredExpenses = [...filteredExpenses].filter(item =>
        item.userId === Number(searchQuery.userId)
      );
    }

    if (searchQuery.from) {
      filteredExpenses = [...filteredExpenses].filter(item =>
        new Date(item.spentAt) > new Date(searchQuery.from)
      );
    }

    if (searchQuery.to) {
      filteredExpenses = [...filteredExpenses].filter(item =>
        new Date(item.spentAt) < new Date(searchQuery.to)
      );
    }

    if (searchQuery.id) {
      filteredExpenses = [...filteredExpenses].filter(item =>
        item.id === Number(searchQuery.id)
      );
    }

    return filteredExpenses;
  }
};

const create = (userId, spentAt, title, amount, category, note = null) => {
  const newExpense = {
    id: Math.floor(Math.random() * 10000),
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

const remove = (expenseId) => {
  expenses = expenses.filter(expense => expense.id !== Number(expenseId));
};

const update = (expenseId, newData) => {
  expenses = expenses.map(expense => {
    if (expense.id === Number(expenseId)) {
      return Object.assign(expense, newData);
    } else {
      return expense;
    }
  });

  return getByQuery({ expenseId })[0];
};

const clearExpenses = () => {
  expenses = [];
};

module.exports = {
  getByQuery,
  create,
  remove,
  update,
  clearExpenses,
};
