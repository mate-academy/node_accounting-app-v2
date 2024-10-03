const { Router } = require('express');
const service = require('./usersServices.js');
const usersRouter = Router();

usersRouter.get('/', async (req, res) => {
  const users = await service.getAllUsers();

  res.status(200).json(users);
});

usersRouter.post('/', async (req, res) => {
  const name = req.body.name;

  if (!name) {
    return res.sendStatus(400);
  }

  const user = await service.addUser(name);

  res.status(201).json(user);
});

usersRouter.get('/:id', async (req, res) => {
  const userId = req.params.id;

  if (!userId) {
    return res.sendStatus(400);
  }

  const foundUser = await service.getUser(userId);

  if (!foundUser) {
    return res.sendStatus(404);
  }

  res.status(200).json(foundUser);
});

usersRouter.delete('/:id', async (req, res) => {
  const userId = req.params.id;

  if (!userId) {
    return res.sendStatus(400);
  }

  const deletedUser = await service.deleteUser(userId);

  if (!deletedUser) {
    return res.sendStatus(404);
  }

  res.sendStatus(204);
});

usersRouter.patch('/:id', async (req, res) => {
  const userToUpdateId = req.params.id;
  const userName = req.body.name;

  const updatedUser = await service.updateUser(userToUpdateId, userName);

  if (!updatedUser) {
    return res.sendStatus(404);
  }

  res.status(200).json(updatedUser);
});

module.exports = {
  usersRouter,
};
