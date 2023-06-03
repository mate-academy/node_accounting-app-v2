const { v4 } = require('uuid');

let expenses = [];

const getAll = () => expenses;

const add = (expenseData) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = expenseData;
  const isDataValid = !userId
    || !spentAt
    || !title
    || !amount
    || !category
    || !note;

  if (isDataValid) {
    return null;
  }

  const newExpense = {
    id: v4(),
    ...expenseData,
  };

  expenses.push(newExpense);

  return newExpense;
};

const getById = (expenseId) => expenses.find(
  expense => expense.id === expenseId
) || null;

const remove = (expenseId) => {
  expenses = expenses.filter(expense => expense.id !== expenseId);
};

const edit = (foundExpense, dataToChange) => {
  const {
    spentAt,
    title,
    amount,
    category,
    note,
  } = dataToChange;
  const isDataValid = !spentAt
    || !title
    || !amount
    || !category
    || !note;

  if (isDataValid) {
    return null;
  }

  Object.assign(foundExpense, dataToChange);

  return true;
};

module.exports = {
  getAll,
  add,
  getById,
  remove,
  edit,
};
