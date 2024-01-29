'use strict';

const { getAllUsers, getUserById } = require('../services/users.services');

const getAll = (req, res) => {
  res.send(getAllUsers());
};

const getOne = (req, res) => {
  const { id } = req.params;
  const user = getUserById(+id);

  if (!user) {
    res.sendStatus(404);
  }

  res.send(user);
};

module.exports = {
  getAll,
  getOne,
};
