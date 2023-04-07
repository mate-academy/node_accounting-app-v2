'use strict';

const { users } = require('../models/users');

const initialize = () => users.init();

const getAll = () => users.getAll();

const getById = (userId) => users.getById(userId);

const create = (name) => users.create(name);

const remove = (userId) => users.delete(userId);

const update = (user, name) => users.update(user, name);

module.exports = {
  initialize,
  getAll,
  getById,
  create,
  remove,
  update,
};
