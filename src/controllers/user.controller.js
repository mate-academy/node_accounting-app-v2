const { UserService } = require('../services/user.service');

function createUserController(store) {
  const service = UserService(store);

  function getUsers(req, res) {
    const users = service.getAll();

    res.status(200).json(users);
  }

  function createUser(req, res) {
    const { name } = req.body;

    if (
      name === undefined ||
      name === null ||
      typeof name !== 'string' ||
      name.trim() === ''
    ) {
      return res.status(400).json({ message: 'Name is required' });
    }

    const user = service.create({ name: name.trim() });

    return res.status(201).json(user);
  }

  function getUserById(req, res) {
    const id = +req.params.id;
    const user = service.getById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  }

  function deleteUser(req, res) {
    const id = +req.params.id;
    const removed = service.remove(id);

    if (!removed) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.sendStatus(204);
  }

  function updateUser(req, res) {
    const id = +req.params.id;
    const { name } = req.body;

    if (
      name === undefined ||
      name === null ||
      typeof name !== 'string' ||
      name.trim() === ''
    ) {
      return res.status(400).json({ message: 'Name is required' });
    }

    const user = service.patch({ name: name.trim() }, id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  }

  return {
    getUsers,
    createUser,
    getUserById,
    deleteUser,
    patchUser: updateUser,
    putUser: updateUser,
  };
}

module.exports = { createUserController };
