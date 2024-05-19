const getMaxId = require('../utils/getMaxId');

const expenses = [];

const reset = () => {
  expenses.length = 0;
};

const getAll = (query) => {
  const { from, to, userId, categories } = query;
  const fromDate = from ? new Date(from) : null;
  const toDate = to ? new Date(to) : null;

  const filteredExpenses = expenses.filter((exp) => {
    return (
      (!userId || exp.userId === Number(userId)) &&
      (!categories || categories.includes(exp.category)) &&
      (!fromDate || new Date(exp.spentAt) >= fromDate) &&
      (!toDate || new Date(exp.spentAt) <= toDate)
    );
  });

  return filteredExpenses;
};

const getById = (id) => {
  return expenses.find((outlay) => outlay.id === Number(id)) || null;
};

const create = (body) => {
  const expense = {
    id: getMaxId(expenses),
    ...body,
  };

  expenses.push(expense);

  return expense;
};

const update = (id, body) => {
  const expense = getById(id);

  Object.assign(expense, body);

  return expense;
};

const remove = (id) => {
  const index = expenses.findIndex((user) => user.id === Number(id));

  expenses.splice(index, 1);
};

module.exports = {
  reset,
  getAll,
  getById,
  create,
  update,
  remove,
};
