const { getId } = require('../helpers/getId');

let expenses = [];

const initialize = () => {
  expenses = [];
};

const getExpenses = (userId, categories, from, to) => {
  return expenses.filter(
    (item) =>
      (!userId || item.userId === Number(userId)) &&
      (!categories || item.category === categories) &&
      (!from || !to || (item.spentAt >= from && item.spentAt <= to)),
  );
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
    id: getId(),
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(expense);

  return expense;
};

const getExpenseById = (id) => {
  return expenses.find((expense) => expense.id === Number(id));
};

const update = ({ id, title }) => {
  const expense = getExpenseById(id);

  Object.assign(expense, {
    title,
  });

  return expense;
};

const remove = (id) => {
  const index = expenses.findIndex((expense) => expense.id === Number(id));

  if (index !== -1) {
    expenses.splice(index, 1);
  }
};

module.exports = {
  initialize,
  create,
  getExpenses,
  getExpenseById,
  update,
  remove,
};
