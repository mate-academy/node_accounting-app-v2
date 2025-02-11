const { userService } = require('../services/user.service');

const getAll = (req, res) => {
  const users = userService.getAll();

  res.json(users);
};

const getOne = (req, res) => {
  const user = userService.getById(+req.params.id);

  if (!user) {
    return res.sendStatus(404);
  }

  return res.json(user);
};

const create = (req, res) => {
  const name = req.body.name;

  if (!name) {
    return res.sendStatus(400);
  }

  const user = userService.create(name);

  res.status(201).json(user);
};

const remove = (req, res) => {
  const userToRemove = userService.getById(+req.params.id);

  if (!userToRemove) {
    return res.sendStatus(404);
  }

  userService.removeById(+req.params.id);

  res.sendStatus(204);
};

const update = (req, res) => {
  const userToUpdate = userService.getById(+req.params.id);

  if (!userToUpdate) {
    return res.sendStatus(404);
  }

  const updatedUser = {
    id: +req.params.id,
    name: req.body.name,
  };

  return res.json(updatedUser);
};

const userController = {
  getAll,
  getOne,
  create,
  remove,
  update,
};

module.exports = {
  userController,
};
