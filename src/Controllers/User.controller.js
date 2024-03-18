'use strict';

const {
  getAllUsers,
  getUser,
  createUser,
  patchUser,
  deleteUser,
} = require('../Services/User.services');
const {
  OK,
  NOT_FOUND,
  NO_CONTENT,
  BAD_REQUEST,
  CREATED,
} = require('../StatusCodes/StatusCodes');

const getUsersControll = (req, res) => {
  res.status(OK).send(getAllUsers());
};

const getUserByIdControll = (req, res) => {
  const { userId } = req.params;

  const user = getUser(userId);

  if (!user) {
    res.sendStatus(NOT_FOUND);

    return;
  }

  res.status(OK).send(user);
};

const deleteUserControll = (req, res) => {
  const { userId } = req.params;
  const user = getUser(userId);

  if (!user) {
    res.sendStatus(NOT_FOUND);

    return;
  }

  deleteUser(userId);
  res.sendStatus(NO_CONTENT);
};

const createUserControll = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(BAD_REQUEST);

    return;
  }

  const user = createUser(name);

  res.status(CREATED).send(user);
};

const updateUserControll = (req, res) => {
  const { name } = req.body;
  const { userId } = req.params;

  const user = getUser(userId);

  if (!user) {
    res.sendStatus(NOT_FOUND);

    return;
  }

  res.status(OK).send(patchUser(userId, name));
};

module.exports = {
  getUsersControll,
  getUserByIdControll,
  deleteUserControll,
  createUserControll,
  updateUserControll,
};
