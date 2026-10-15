const model = require('../models/expense');

const getAll = () => {
  return model.getAll();
};

const getById = (id) => {
  return model.getById(id);
};

const remove = (id) => {
  return model.deleteById(id);
};

const create = (expense) => {
  return model.create(expense);
};

const update = (expense) => {
  return model.update(expense);
};

module.exports = {
  getAll,
  getById,
  remove,
  update,
  create,
};
