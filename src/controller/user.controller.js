const userService = require('../services/user.service');

const get = (req, res) => {
  const users = userService.getAll();

  if (!users) {
    res.send([]);
    res.sendStatus(404);

    return;
  }

  res.send(users);
};

const getOne = (req, res) => {
  const { id } = req.params;
  const user = userService.getById(+id);

  if (!user) {
    res.sendStatus(404);
    return;
  }

  res.send(user);
};

const update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const user = userService.getById(+id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  if (typeof name !== 'string') {
    res.sendStatus(422);

    return;
  }

  const updatedUser = userService.updateUser({ id: +id, name });

  if (!updatedUser) {
    res.sendStatus(404);
    return;
  }

  res.send(updatedUser);
};

const create = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);
  }

  const user = userService.createUser(name);

  res.statusCode = 201;
  res.send(user);
};

const remove = (req, res) => {
  const { id } = req.params;
  const userId = +id;
  if (userService.getById(userId)) {
    userService.deleteUser(userId);
    res.sendStatus(204);

    return;
  }

  res.sendStatus(404);
};

module.exports = {
  get,
  getOne,
  update,
  create,
  remove,
};
