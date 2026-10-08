const usersService = require('../services/users.service');

const getAll = (req, res) => {
  res.status(200).send(usersService.getAll());
};

const create = (req, res) => {
  const { name: userName } = req.body;

  if (!userName) {
    res.sendStatus(400);

    return;
  }

  res.status(201).send(usersService.create(userName));
};

const get = (req, res) => {
  let { id: userId } = req.params;

  userId = Number(userId);

  if (!Number.isInteger(userId)) {
    res.sendStatus(400);

    return;
  }

  const user = usersService.get(userId);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.status(200).send(user);
};

const remove = (req, res) => {
  let { id: userId } = req.params;

  userId = Number(userId);

  if (!usersService.get(userId)) {
    res.sendStatus(404);

    return;
  }

  usersService.remove(userId);

  res.sendStatus(204);
};

const update = (req, res) => {
  const { name: userName } = req.body;
  let { id: userId } = req.params;

  userId = Number(userId);

  if (!userName || !Number.isInteger(userId)) {
    res.sendStatus(400);

    return;
  }

  if (!usersService.get(userId)) {
    res.sendStatus(404);

    return;
  }

  const updatedUser = usersService.update(userId, userName);

  res.status(200).send(updatedUser);
};

module.exports = {
  getAll,
  create,
  get,
  remove,
  update,
};
