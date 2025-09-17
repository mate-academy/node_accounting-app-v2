function getUsers(req, res) {
  res.send(req.app.locals.users);
}

function createUser(req, res) {
  const { name } = req.body;

  if (!name || !name.trim()) {
    return res.sendStatus(400);
  }

  const newUser = {
    id: req.app.locals.nextUserId++,
    name,
  };

  req.app.locals.users.push(newUser);

  res.status(201).send(newUser);
}

function getUserById(req, res) {
  const { id } = req.params;
  const numericId = Number(id);

  if (isNaN(numericId)) {
    return res.sendStatus(400);
  }

  const user = req.app.locals.users.find((u) => u.id === numericId);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.send(user);
}

function deleteUser(req, res) {
  const { id } = req.params;

  const numericId = Number(id);

  if (isNaN(numericId)) {
    return res.sendStatus(400);
  }

  const userIndex = req.app.locals.users.findIndex((u) => u.id === numericId);

  if (userIndex === -1) {
    res.sendStatus(404);

    return;
  }

  req.app.locals.users.splice(userIndex, 1);
  res.sendStatus(204);
}

function updateUser(req, res) {
  const { id } = req.params;
  const { name } = req.body;
  const numericId = Number(id);

  if (isNaN(numericId)) {
    return res.sendStatus(400);
  }

  if (!name || !name.trim()) {
    return res.sendStatus(400);
  }

  const user = req.app.locals.users.find((u) => u.id === numericId);

  if (!user) {
    return res.sendStatus(404);
  }

  user.name = name.trim();
  res.send(user);
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
