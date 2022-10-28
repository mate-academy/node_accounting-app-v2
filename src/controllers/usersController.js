import * as userServices from '../services/usersService.js';

export const getUsers = (req, res) => {
  res.send(userServices.getUsers());
};

export const getUser = (req, res) => {
  const { userId } = req.params;

  const searchUser = userServices.getUser(userId);

  if (!searchUser) {
    res.sendStatus(404);

    return;
  }

  res.send(searchUser);
};

export const createUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(422);

    return;
  }

  const user = userServices.createUser(name);

  res.statusCode = 201;
  res.send(user);
};

export const removeUser = (req, res) => {
  const { userId } = req.params;
  const searchUser = userServices.getUser(userId);

  if (!userId) {
    res.sendStatus(404);

    return;
  }

  if (!searchUser) {
    res.sendStatus(404);

    return;
  }

  userServices.removeUser(userId);

  res.sendStatus(204);
};

export const updateUser = (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    res.sendStatus(400);
  }

  const foundUser = userServices.getUser(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  const { name } = req.body;

  userServices.updateUser(userId, name);
  res.send(foundUser);
};
