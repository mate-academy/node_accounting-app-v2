const {
  getRandomNumberFromUUID,
} = require('../helpers/getRandomNumberFromUUID');

let expenses = [];

const start = () => {
  expenses = [];
};

const getExpenses = (userId, categories, from, to) => {
  let filteredExpenses = [...expenses];

  if (userId) {
    filteredExpenses = filteredExpenses.filter(
      (item) => item.userId === Number(userId),
    );
  }

  if (categories) {
    filteredExpenses = filteredExpenses.filter(
      (item) => item.category === categories,
    );
  }

  if (from || to) {
    filteredExpenses = filteredExpenses.filter(
      (item) => item.spentAt >= from && item.spentAt <= to,
    );
  }

  return filteredExpenses;
};

const getExpenseById = (id) => {
  return expenses.find((expense) => expense.id === Number(id));
};

const create = (
  userId,
  spentAt = new Date().toISOString(),
  title,
  amount = 1,
  category,
  note,
) => {
  const expense = {
    userId,
    id: getRandomNumberFromUUID(),
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(expense);

  return expense;
};

const remove = (id) => {
  expenses = expenses.filter((expense) => expense.id !== Number(id));
};

const update = ({ id, title }) => {
  const expense = getExpenseById(id);

  Object.assign(expense, {
    title,
  });

  return expense;
};

module.exports = {
  getExpenses,
  getExpenseById,
  create,
  remove,
  update,
  start,
};
