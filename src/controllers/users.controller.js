const store = require('../data/store.js');

function getAllUsers(req, res) {
  res.send(store.users);
}

function getUserById(req, res) {
  const { id } = req.params;
  const user = store.users.find((item) => item.id === Number(id));

  if (!user) {
    return res.sendStatus(404);
  }

  res.status(200).send(user);
}

function remove(req, res) {
  const { id } = req.params;
  const user = store.users.find((item) => item.id === Number(id));

  if (!user) {
    return res.status(404).send(store.users);
  }

  store.users = store.users.filter((exp) => exp.id !== Number(id));

  return res.status(204).send(store.users);
}

function create(req, res) {
  const { name } = req.body;

  if (!name) {
    return res.sendStatus(400);
  }

  const user = {
    id: store.getNextUserId(),
    name,
  };

  store.users.push(user);
  res.status(201).send(user);
}

function update(req, res) {
  const { id } = req.params;
  const { name } = req.body;

  const user = store.users.find((item) => item.id === Number(id));

  if (!user) {
    return res.status(404).send(store.users);
  }

  user['name'] = name;

  return res.status(200).send(user);
}

module.exports = {
  getAllUsers,
  getUserById,
  remove,
  create,
  update,
};
