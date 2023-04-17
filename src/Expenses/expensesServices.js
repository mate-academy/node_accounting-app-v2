'use strict';

let expenses = [];

const getAll = () => expenses;

const getById = (expenseId) => {
  const foundExpense = expenses.find(expense => expense.id === +expenseId);

  return foundExpense || null;
};

const getFiltered = (query) => {
  const { userId, category, from, to } = query;

  const filteredExpenses = expenses.filter(expense => {
    if (userId && expense.userId !== +userId) {
      return false;
    }

    if (category && expense.category !== category) {
      return false;
    }

    const fromDate = new Date(from);
    const toDate = new Date(to);

    if ((from && to)
      && (new Date(expense.spentAt) < fromDate
      || new Date(expense.spentAt) > toDate)
    ) {
      return false;
    }

    return true;
  });

  return filteredExpenses;
};

const create = ({
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
}) => {
  const maxId = expenses.length
    ? Math.max(...expenses.map(expense => expense.id))
    : 0;

  const newExpense = {
    id: maxId + 1,
    userId: +userId,
    spentAt,
    title,
    amount,
    category,
    note: note || '',
  };

  expenses.push(newExpense);

  return newExpense;
};

const remove = (expenseId) => {
  expenses = expenses.filter(expense => expense.id !== +expenseId);
};

const update = ({
  id,
  spentAt,
  title,
  amount,
  category,
  note,
}) => {
  const expense = getById(id);

  Object.assign(expense, {
    spentAt: spentAt || expense.spentAt,
    title: title || expense.title,
    amount: amount || expense.amount,
    category: category || expense.category,
    note: note || expense.note,
  });

  return expense;
};

module.exports = {
  getAll,
  getById,
  getFiltered,
  create,
  remove,
  update,
};
