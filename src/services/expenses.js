'use strict';

let expenses = [];

const initiate = () => {
  expenses = [];
};

const getAll = ({
  userId,
  categories,
  from,
  to,
}) => (
  expenses.filter(expense => {
    const byUserId = userId
      ? expense.userId === +userId
      : true;

    const byCategories = categories
      ? categories.includes(expense.category)
      : true;

    const byFrom = from
      ? expense.spentAt > from
      : true;

    const byTo = to
      ? expense.spentAt < to
      : true;

    return byUserId && byCategories && byFrom && byTo;
  }));

const getById = (expenseId) => {
  const foundExpense = expenses.find(e => e.id === +expenseId);

  return foundExpense || null;
};

const create = ({
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
}) => {
  const maxId = Math.max(...expenses.map(expense => expense.id), 0);

  const newExpense = {
    id: maxId + 1,
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

const update = ({ expenseId, data }) => {
  const expense = getById(expenseId);

  Object.assign(expense, data);

  return expense;
};

const remove = (expenseId) => {
  expenses = expenses.filter(expense => expense.id !== +expenseId);
};

module.exports = {
  initiate,
  getAll,
  getById,
  create,
  update,
  remove,
};
