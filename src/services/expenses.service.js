const { v4: uuidv4 } = require('uuid');
// import { expenses } from '../createServer';

const expenses = require('./../createServer');

const getAll = (userId, categories) => {
  return expenses.filter(
    (item) => item.id === userId && categories.includes(item.category),
  );
};

const getById = (id) => {
  return expenses.find((item) => item.id === id);
};

const create = (userId, spentAt, title, amount, category, note) => {
  const item = {
    id: uuidv4(),
    userId: userId,
    spentAt: spentAt,
    title: title,
    amount: amount,
    category: category,
    note: note,
  };

  expenses.push(item);

  return item;
};

const remove = (id) => {
  return expenses.filter((item) => item.id !== id);
};

const change = (id, spentAt, title, amount, category, note) => {
  const item = getById(id);

  item.spentAt = spentAt;
  item.title = title;
  item.amount = amount;
  item.category = category;
  item.note = note;

  return item;
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  change,
};
