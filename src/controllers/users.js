const userService = require('../services/users');

const getAll = (req, res) => {
  res.status(200);
  res.send(userService.getAll());
};

const addNew = (req, res) => {
  const userName = req.body.name;

  if (!userName) {
    res.sendStatus(400);

    return;
  }

  res.status(201);
  res.send(userService.addUser(userName));
};

const getById = (req, res) => {
  const userId = req.params.id;

  if (!userService.userExists(userId)) {
    res.sendStatus(404);

    return;
  }

  res.send(userService.getById(userId));
};

const remove = (req, res) => {
  const userId = req.params.id;

  if (!userService.userExists(userId)) {
    res.sendStatus(404);

    return;
  }

  res.status(204);
  res.send(userService.deleteUser(userId));
};

const update = (req, res) => {
  const userId = req.params.id;
  const userName = req.body.name;

  if (!userName || !userService.userExists(userId)) {
    res.sendSTatus(404);

    return;
  }

  res.send(userService.updateUser({ id: userId, name: userName }));
};

module.exports = {
  getAll,
  addNew,
  getById,
  remove,
  update,
};
