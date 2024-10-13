const {
  getUsers,
  addUser,
  getUser,
  deleteUser,
  updateUser,
} = require('./../services/user.service');

const getAll = (req, res) => {
  res.statusCode = 200;
  const users = getUsers();
  res.send(users);
};

const add = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);
  }

  const rawUser = {
    name,
  };

  const user = addUser(rawUser);

  res.statusCode = 201;
  res.send(user);
};

const get = (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400);
  }

  const user = getUser(+id);

  if (!user) {
    res.sendStatus(404);
  }

  res.send(user);
};

const remove = (req, res) => {
  const { id } = req.params;
  const user = getUser(+id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  deleteUser(+id);
  res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!id || !name) {
    res.sendStatus(400);
  }

  const user = getUser(+id);

  if (!user) {
    res.sendStatus(404);
  }

  const newUser = {
    id: +id,
    name,
  };

  updateUser(newUser);
  res.send(newUser);
};

module.exports = { getAll, add, get, remove, update };
