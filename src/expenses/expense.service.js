const { generateId } = require('../utils/utils');

const expenses = [];

const getAll = () => {
  return expenses;
};

const getById = (id) => {
  return expenses.find((expense) => expense.id === +id);
};

const add = ({ userId, spentAt, title, amount, category, note }) => {
  const newExpense = {
    id: generateId(),
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
  const index = expenses.findIndex((expense) => expense.id === +id);

  if (index === -1) {
    return;
  }

  const existing = expenses[index];
  const updatedExpense = {
    ...existing,
    ...Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value !== undefined),
    ),
  };

  expenses[index] = updatedExpense;

  return updatedExpense;
};

const deleteById = (id) => {
  const index = expenses.findIndex((expense) => expense.id === +id);

  if (index === -1) {
    return;
  }

  expenses.splice(index, 1);

  return true;
};

const clear = () => {
  expenses.length = 0;
};

module.exports = {
  getAll,
  getById,
  add,
  update,
  deleteById,
  clear,
};
