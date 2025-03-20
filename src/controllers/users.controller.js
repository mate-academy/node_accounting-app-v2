const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require('../services/users.services.js');

const getAll = (req, res) => {
  res.send(getAllUsers());
};

const getOne = (req, res) => {
  const { id } = req.params;
  const user = getUserById(id);

  if (!user) {
    res.status(404).send({ error: 'User not found' });

    return;
  }

  res.send(user);
};

const create = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = createUser(name);

  res.statusCode = 201;
  res.send(newUser);
};

const update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (typeof name !== 'string') {
    res.sendStatus(422);

    return;
  }

  const user = getUserById(id);

  if (!user) {
    res.sendStatus(404).send({ error: 'User not found' });

    return;
  }

  const updatedUser = updateUser(user, name);

  res.send(updatedUser);
};

const deleteOne = (req, res) => {
  const { id } = req.params;
  const user = getUserById(id);

  if (!user) {
    res.sendStatus(404).send({ error: 'User not found' });

    return;
  }
  deleteUser(id);
  res.sendStatus(204);
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  deleteOne,
};
