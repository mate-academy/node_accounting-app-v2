'use strict';

const { getUserId, addUserFreeId } = require('../helpers/getId');

const getAll = (users) => {
  return (req, res) => {
    res.send(users);
  };
};

const add = (users) => {
  return (req, res) => {
    const { name } = req.body;

    const user = {
      id: getUserId(),
      name,
    };

    users.push(user);

    res.status(201).send(user);
  };
};

const getOne = (users) => {
  return (req, res) => {
    const { id } = req.params;

    const foundUser = users.find((user) => user.id === +id);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    res.send(foundUser);
  };
};

const update = (users) => {
  return (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    const foundUser = users.find((user) => user.id === +id);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    foundUser.name = name;

    res.send(foundUser);
  };
};

const remove = (users) => {
  return (req, res) => {
    const { id } = req.params;
    const index = users.findIndex((user) => user.id === +id);

    if (index === -1) {
      res.sendStatus(404);

      return;
    }

    users.splice(index, 1);
    addUserFreeId(index);

    res.sendStatus(204);
  };
};

module.exports = {
  getAll,
  add,
  getOne,
  update,
  remove,
};
