const model = require('../models/user');

const getAll = () => {
  return model.getAll();
};

const getById = (id) => {
  return model.getById(id);
};

const remove = (id) => {
  return model.deleteById(id);
};

const create = (user) => {
  return model.create(user);
};

const update = (user) => {
  return model.update(user);
};

module.exports = {
  getAll,
  getById,
  remove,
  update,
  create,
};
