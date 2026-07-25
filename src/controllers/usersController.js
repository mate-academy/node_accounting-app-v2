'use strict';

function createUsersController(store) {
  const getUsers = (req, res) => {
    res.json(store.users);
  };

  const getUserById = (req, res) => {
    const id = Number(req.params.id);
    const user = store.users.find((u) => u.id === id);

    if (!user) {
      res.status(404).send('User not found');

      return;
    }

    res.json(user);
  };

  const createUser = (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.status(400).send('Name is required');

      return;
    }

    const newUser = {
      id: store.nextUserId++,
      name,
    };

    store.users.push(newUser);

    res.status(201).json(newUser);
  };

  const updateUser = (req, res) => {
    const id = Number(req.params.id);
    const user = store.users.find((u) => u.id === id);

    if (!user) {
      res.status(404).send('User not found');

      return;
    }

    const { name } = req.body;

    if (name !== undefined) {
      user.name = name;
    }

    res.json(user);
  };

  const deleteUser = (req, res) => {
    const id = Number(req.params.id);
    const index = store.users.findIndex((u) => u.id === id);

    if (index === -1) {
      res.status(404).send('User not found');

      return;
    }

    store.users.splice(index, 1);

    res.status(204).end();
  };

  return {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
  };
}

module.exports = {
  createUsersController,
};
