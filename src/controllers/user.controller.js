'use strict';

function createUserController(userService) {
  const getUsers = (req, res) => {
    res.send(userService.getAllUsers());
  };

  const getUserById = (req, res) => {
    const user = userService.getUserById(req.params.id);

    if (!user) {
      return res.sendStatus(404);
    }

    res.send(user);
  };

  const createUser = (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.sendStatus(400);
    }

    const user = userService.createUser(name);

    return res.status(201).send(user);
  };

  const removeUser = (req, res) => {
    const { id } = req.params;

    if (!userService.getUserById(id)) {
      return res.sendStatus(404);
    }

    userService.removeUser(id);

    res.sendStatus(204);
  };

  const updateUser = (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    if (name !== undefined && typeof name !== 'string') {
      return res.sendStatus(400);
    }

    const user = userService.updateUser(id, name);

    if (!user) {
      return res.sendStatus(404);
    }

    res.send(user);
  };

  return {
    getUsers,
    getUserById,
    createUser,
    removeUser,
    updateUser,
  };
}

module.exports = createUserController;
