'use strict';

let expenses = [];

const getMax = (array) => {
  if (array.length === 0) {
    return 0;
  }

  return Math.max(...array.map(({ id }) => id)) + 1;
};

function getAll({ userId, categories, from, to }) {
  let data = [...expenses];

  if (userId) {
    data = expenses.filter(expence => expence.userId === +userId);
  }

  if (categories) {
    data = expenses
      .filter(expence => expence.category === categories);
  }

  if (from && to) {
    data = expenses.filter(expence => {
      const expanseDate = new Date(expence.spentAt);
      const fromDate = new Date(+from);
      const toDate = new Date(+to);

      return (fromDate <= expanseDate) && (toDate > expanseDate);
    });
  }

  return data;
}

function getById(expenseId) {
  return expenses
    .find(expense => expense.id === +expenseId) || null;
}

function create(data) {
  const id = getMax(expenses);

  const newExpense = {
    id,
    ...data,
  };

  expenses.push(newExpense);

  return newExpense;
}

function remove(expenseId) {
  expenses = expenses.filter(expense => expense.id !== Number(expenseId));

  return expenses;
}

function removeMany(ids) {
  if (!ids.every(getById)) {
    throw new Error();
  }
  expenses = expenses.filter(expense => !ids.includes(expense.id));
}

function update(expanseId, body) {
  const expense = getById(expanseId);

  Object.assign(expense, body);

  return expense;
}

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
  removeMany,
};
