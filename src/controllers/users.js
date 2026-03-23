'use strict';

function createUsersController({ usersService }) {
  function createUser(req, res) {
    if (req.body.name === undefined) {
      res.status(400).send({ message: 'Name is required' });

      return;
    }

    const user = usersService.createUser(req.body.name);

    res.status(201).send(user);
  }

  function getUsers(req, res) {
    res.send(usersService.getUsers());
  }

  function getUser(req, res) {
    const user = usersService.getUserById(Number(req.params.userId));

    if (!user) {
      res.status(404).send({ message: 'User not found' });

      return;
    }

    res.send(user);
  }

  function updateUser(req, res) {
    const user = usersService.getUserById(Number(req.params.userId));

    if (!user) {
      res.status(404).send({ message: 'User not found' });

      return;
    }

    if (req.body.name === undefined) {
      res.status(400).send({ message: 'Name is required' });

      return;
    }

    res.send(usersService.updateUser(user.id, req.body));
  }

  function deleteUser(req, res) {
    const isDeleted = usersService.deleteUser(Number(req.params.userId));

    if (!isDeleted) {
      res.status(404).send({ message: 'User not found' });

      return;
    }

    res.status(204).send();
  }

  return {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser,
  };
}

module.exports = {
  createUsersController,
};
