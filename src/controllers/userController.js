const {
  getUsers,
  getUserById,
  create,
  remove,
  update,
} = require('../services/userService');

const getAll = (req, res) => {
  res.statusCode = 200;
  res.send(getUsers());
};

const getUser = (req, res) => {
  const { id } = req.params;

  const user = getUserById(+id);

  if (!user) {
    return res.sendStatus(404);
  }

  res.statusCode = 200;
  res.send(user);
};

const createUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.sendStatus(400);
  }

  res.statusCode = 201;
  res.send(create(name));
};

const removeUser = (req, res) => {
  const { id } = req.params;
  const user = getUserById(+id);

  if (!user) {
    return res.sendStatus(404);
  }

  res.statusCode = 204;
  res.send(remove(user.id));
};

const updateUser = (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const user = getUserById(+id);

  if (!user) {
    return res.sendStatus(404);
  }

  res.statusCode = 200;
  res.send(update(user.id, body));
};

module.exports = {
  getAll,
  getUser,
  createUser,
  removeUser,
  updateUser,
};
