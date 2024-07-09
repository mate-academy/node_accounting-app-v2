const {
  getAll,
  getById,
  create,
  remove,
  update,
} = require('./services/users.service');

const getAllUsers = (req, res) => {
  res.send(getAll());
};

const getByIdUser = (req, res) => {
  const { id } = req.params;

  const userById = getById(id);

  if (!userById) {
    res.sendStatus(404);

    return;
  }

  res.send(userById);
};

const createUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  res.statusCode = 201;

  res.send(create(name));
};

const removeUser = (req, res) => {
  const { id } = req.params;

  if (!getById(id)) {
    res.sendStatus(404);

    return;
  }

  remove(id);

  res.sendStatus(204);
};

const updateUser = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const userById = getById(id);

  if (!userById) {
    res.sendStatus(404);

    return;
  }

  if (!name) {
    res.sendStatus(422);

    return;
  }

  update(userById, name);

  res.statusCode = 200;
  res.send(userById);
};

module.exports = {
  getAllUsers,
  getByIdUser,
  createUser,
  removeUser,
  updateUser,
};
