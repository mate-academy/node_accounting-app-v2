const userService = require('../services/user.service');

function getAll(_req, res) {
  const users = userService.getUsers();

  res.send(users);
}

function getOne(req, res) {
  const { id } = req.params;
  const user = userService.getUser(+id);

  if (user) {
    res.send(user);
  } else {
    res.sendStatus(404);
  }
}

function createOne(req, res) {
  const userData = req.body;

  try {
    const user = userService.createUser(userData);

    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e.message);
  }
}

function updateOne(req, res) {
  const { id } = req.params;
  const userData = req.body;

  try {
    const user = userService.updateUser(+id, userData);

    if (!user) {
      res.sendStatus(404);

      return;
    }

    res.send(user);
  } catch (e) {
    res.statusMesage(e.message).sendStatus(400);
  }
}

function deleteOne(req, res) {
  const { id } = req.params;

  const success = userService.deleteUser(+id);

  if (success) {
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
}

module.exports = {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
};
