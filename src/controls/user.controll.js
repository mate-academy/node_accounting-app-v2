import * as userService from '../services/user.service.js';

export const getUsers = (req, res) => {
  res.send(userService.getAllUsers());
};

export const getByIdUsers = (req, res) => {
  const { id } = req.params;
  const user = userService.getUserById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }
  res.send(user);
};

export const removeUser = (req, res) => {
  const { id } = req.params;

  if (!userService.getUserById(id)) {
    res.sendStatus(404);

    return;
  }

  userService.deleteUser(id);

  res.sendStatus(204);
};

export const createUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const user = userService.createUser(name);

  res.status(201).send(user);
};

export const updateUser = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const user = userService.getUserById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  if (typeof name !== 'string') {
    res.sendStatus(400);

    return;
  }

  const updatedUser = userService.updatedUser({ id, name });

  res.send(updatedUser);
};
