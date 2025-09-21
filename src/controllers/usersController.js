const usersService = require('../services/usersService');

function getUsers(req, res) {
  res.status(200).send(usersService.getAll());
}

function createUser(req, res) {
  const { name } = req.body;

  try {
    const newUser = usersService.create(name);

    return res.status(201).send(newUser);
  } catch (err) {
    return res.status(err.code || 400).send({ message: err.message });
  }
}

function getUserById(req, res) {
  const { id } = req.params;
  const user = usersService.getById(Number(id));

  if (!user) {
    return res.sendStatus(404);
  }

  res.status(200).send(user);
}

function deleteUser(req, res) {
  const { id } = req.params;
  const deleted = usersService.remove(Number(id));

  if (!deleted) {
    return res.sendStatus(404);
  }

  res.sendStatus(204);
}

function updateUser(req, res) {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const updated = usersService.update(Number(id), name);

    res.status(200).send(updated);
  } catch (err) {
    res.status(err.code || 400).send({ message: err.message });
  }
}

module.exports = {
  getUsers,
  createUser,
  getUserById,
  deleteUser,
  updateUser,
};
