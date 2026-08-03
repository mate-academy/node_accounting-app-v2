// const { v4: uuidv4 } = require('uuid');

let expenses = [];
let nextId = 1;

const getAll = ({ userId, from, to, categories }) => {
  let filteredExpenses = expenses;

  if (userId) {
    filteredExpenses = filteredExpenses.filter(
      (expense) => expense.userId === +userId,
    );
  }

  if (categories) {
    filteredExpenses = filteredExpenses.filter(
      (expense) => expense.category === categories,
    );
  }

  if (from) {
    filteredExpenses = filteredExpenses.filter(
      (expense) => new Date(expense.spentAt) >= new Date(from),
    );
  }

  if (to) {
    filteredExpenses = filteredExpenses.filter(
      (expense) => new Date(expense.spentAt) <= new Date(to),
    );
  }

  return filteredExpenses;
};

const getById = (id) => expenses.find((expense) => expense.id === +id) || null;

const create = ({ userId, spentAt, title, amount, category, note }) => {
  const id = nextId;

  const expense = {
    id,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  nextId += 1;

  expenses.push(expense);

  return expense;
};
const remove = (id) => (expenses = expenses.filter((item) => item.id !== +id));

const update = ({ id, ...fields }) => {
  const expense = getById(id);

  Object.assign(expense, fields);

  return expense;
};
const reset = () => {
  expenses = [];
  nextId = 1;
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
  reset,
};
