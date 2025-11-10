'use strict';

function getUserById(req, res) {
  const users = req.app.locals.users;
  const userId = Number(req.params.id);

  const user = users.find((u) => u.id === userId);

  if (!user) {
    return res.status(404).send('User not found');
  }
  res.json(user);
}

function patchUserById(req, res) {
  const users = req.app.locals.users;
  const user = users.find((u) => u.id === Number(req.params.id));

  if (!user) {
    return res.status(404).send('User not found');
  }

  user.name = req.body.name ?? user.name;
  res.json(user);
}

function deleteUserById(req, res) {
  const users = req.app.locals.users;
  const index = users.findIndex((u) => u.id === Number(req.params.id));

  if (index === -1) {
    return res.status(404).send('User not found');
  }

  users.splice(index, 1);
  res.status(204).send();
}

module.exports = { getUserById, patchUserById, deleteUserById };
