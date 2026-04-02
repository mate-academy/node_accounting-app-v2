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
  const userIndex = store.users.findIndex((item) => item.id === Number(id));

  if (userIndex === -1) {
    return res.status(404).json({ error: 'Not found' });
  }

  store.users.splice(userIndex, 1);

  return res.sendStatus(204);
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
    return res.status(404).json({ error: 'Not found' });
  }

  if (!name) {
    return res.status(400).json({ error: 'Bad Request' });
  }

  user.name = name;

  return res.status(200).send(user);
}

module.exports = {
  getAllUsers,
  getUserById,
  remove,
  create,
  update,
};
