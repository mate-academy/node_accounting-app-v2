const userService = require('./../services/user.service');

function getUsersController(req, res) {
  const users = userService.getAllUsers();

  res.send(users);
}

function getOneUserController(req, res) {
  const id = req.params.id;

  if (id === undefined) {
    res.status(400).send('id is required');

    return;
  }

  const user = userService.getUserById(id);

  if (user === undefined) {
    res.status(404).send('Not Found');

    return;
  }
  res.json(user);
}

function addUserController(req, res) {
  const name = req.body.name;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const createdUser = userService.addUser(name);

  res.status(201).json(createdUser);
}

function updateUserController(req, res) {
  const id = req.params.id;
  const name = req.body.name;
  const updatedUser = userService.updateUser(id, name);

  if (!updatedUser) {
    res.sendStatus(404);

    return;
  }
  res.send(updatedUser);
}

function deleteUserController(req, res) {
  const { id } = req.params;

  const user = userService.getUserById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  userService.deleteUser(id);

  res.sendStatus(204);
}

module.exports = {
  getUsersController,
  getOneUserController,
  addUserController,
  updateUserController,
  deleteUserController,
};
