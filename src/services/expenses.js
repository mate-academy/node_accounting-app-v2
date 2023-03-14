'use strict';

let expenses = [];

const getInitial = () => {
  expenses = [];
};

const getAll = ({
  userId,
  categories,
  from,
  to,
}) => {
  let filteredExpenses = [...expenses];

  if (userId) {
    const userIdToNumber = +userId;

    filteredExpenses = filteredExpenses
      .filter(exp => exp.userId === userIdToNumber);
  }

  if (categories) {
    filteredExpenses = filteredExpenses
      .filter(expense => {
        return categories.includes(expense.category);
      });
  }

  if (from) {
    filteredExpenses = filteredExpenses
      .filter(expense => {
        return expense.spentAt > from;
      });
  }

  if (to) {
    filteredExpenses = filteredExpenses
      .filter(expense => {
        return expense.spentAt < to;
      });
  }

  return filteredExpenses;
};

const getOne = (expenseId) => {
  const foundExpense = expenses.find(expense => expense.id === +expenseId);

  return foundExpense || null;
};

const create = (data) => {
  const newExpense = {
    id: new Date().valueOf(),
    ...data,
  };

  expenses.push(newExpense);

  return newExpense;
};

const update = (foundExpense, data) => {
  Object.assign(foundExpense, data);

  return foundExpense;
};

const remove = (expenseId) => {
  expenses = expenses.filter(expense => expense.id !== +expenseId);
};

module.exports = {
  getInitial,
  getAll,
  getOne,
  create,
  update,
  remove,
};
