const userService = require('./user.service');
const expenses = [];

const getAll = ({ userId, from, to, categories }) => {
  let result = [...expenses];

  if (userId) {
    result = result.filter((expense) => expense.userId === userId);
  }

  if (categories) {
    result = result.filter((expense) => categories.includes(expense.category));
  }

  if (from) {
    result = result.filter((item) => new Date(item.spentAt) >= new Date(from));
  }

  if (to) {
    result = result.filter((item) => new Date(item.spentAt) <= new Date(to));
  }

  return result;
};

const getById = (id) => {
  const expense = expenses.find((element) => element.id === id);

  if (!expense) {
    throw new Error('Not found');
  }

  return expense;
};

const create = (data) => {
  const user = userService.getById(data.userId);

  if (!user) {
    const error = new Error('User not found');

    error.statusCode = 400;
    throw error;
  }

  const id = Math.ceil(Math.random() * 999999999999);
  const expense = { id, ...data };

  expenses.push(expense);

  return expense;
};

const update = (id, data) => {
  const expense = getById(id);

  Object.keys(data).forEach((key) => {
    if (data[key] === undefined) {
      delete data[key];
    }
  });

  Object.assign(expense, data);

  return expense;
};

const remove = (id) => {
  getById(id);

  const index = expenses.findIndex((element) => element.id === id);

  if (index !== -1) {
    expenses.splice(index, 1);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  expenses,
};
