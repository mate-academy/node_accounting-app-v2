'use strict';

const userService = require('../services/user.service.js');

const get = (req, res) => {
  res.send(userService.getAll());
};

const getOne = (req, res) => {
  const { id } = req.params;

  const user = userService.getById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.send(user);
};

const create = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(422);
  }

  const user = userService.create(name);

  res.statusCode = 201;

  res.send(user);
};

const update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const user = userService.getById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  if (typeof name !== 'string') {
    res.sendStatus(422);

    return;
  }

  const updatedUser = userService.update({
    id,
    name,
  });

  res.send(updatedUser);
};

const remove = (req, res) => {
  const { id } = req.params;

  if (!userService.getById(id)) {
    res.sendStatus(404);

    return;
  }

  userService.remove(id);

  res.sendStatus(204);
};

// const removeMany = (req, res, next) => {
//   if (req.query.action !== 'delete') {
//     next();
//     // return;
//   }

//   const { ids } = req.body;

//   if (!Array.isArray(ids)) {
//     res.sendStatus(422);
//     // return;
//   }

//   if (!ids.every((id) => userService.getById(id))) {
//     throw new Error();
//   }

//   userService.removeMany(ids);
//   res.sendStatus(204);
//   // return;
// };

module.exports = {
  get,
  getOne,
  create,
  update,
  remove,
};
