const {
  getAll,
  getUserById,
  create,
  update,
  remove,
} = require('../services/user.service');

const get = (req, res) => {
  res.send(getAll());
};

const getOne = (req, res) => {
  const { id } = req.params;

  const user = getUserById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }
  res.send(user);
};

const createUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const user = create(name);

  res.status(201).send(user);
};

const updateUser = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (typeof name !== 'string') {
    res.sendStatus(400);

    return;
  }

  const updatedUser = update(id, name);

  if (!updatedUser) {
    return res.sendStatus(404);
  }

  res.status(200).send(updatedUser);
};

const removeUser = (req, res) => {
  const { id } = req.params;

  if (!getUserById(id)) {
    res.sendStatus(404);

    return;
  }

  remove(id);

  res.sendStatus(204);
};

module.exports = {
  get,
  getOne,
  createUser,
  updateUser,
  removeUser,
};
