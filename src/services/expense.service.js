'use strict';

let expenses = [];

const getAll = ({ userId, categories, from, to }) => {
  if (categories) {
    expenses = expenses.filter((expense) => {
      return categories.includes(expense.category);
    });
  }

  if (userId) {
    expenses = expenses.filter((expense) => +expense.userId === +userId);
  }

  if (from && to) {
    expenses = expenses.filter((expense) => {
      return expense.spentAt >= from && expense.spentAt <= to;
    });
  }

  return expenses;
};

const getById = (id) => {
  return expenses.find(({ id: expensesId }) => +expensesId === +id);
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
    id: +new Date(),
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

const update = (id, body) => {
  const expense = getById(id);

  Object.assign(expense, body);

  return expense;
};

const remove = (id) => {
  expenses = expenses.filter(({ id: expenseId }) => +expenseId !== +id);
};

const removeAll = () => {
  expenses = [];
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  removeAll,
};
