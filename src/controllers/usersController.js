'use strict';

const {
  getAllUsers,
  getUserById,
  deleteUser,
  updateUser,
  createUser,
} = require('../services/usersService');
const {
  NOT_EXIST_CODE,
  INVALID_PARAMETERS_CODE,
  SUCCESSFUL_DELETION_CODE,
  SUCCESSFUL_CREATION_CODE,
} = require('../utils/constants');
const { validateId } = require('../utils/validateId');
const { prepareIdFromReq } = require('../utils/prepareIdFromReq');

function get(req, res) {
  const users = getAllUsers();

  res.send(users);
}

function getOne(req, res) {
  const id = prepareIdFromReq(req);

  if (validateId(id)) {
    res.sendStatus(INVALID_PARAMETERS_CODE);

    return;
  }

  const user = getUserById(id);

  if (!user) {
    res.sendStatus(NOT_EXIST_CODE);

    return;
  }

  res.send(user);
}

function remove(req, res) {
  const id = prepareIdFromReq(req);

  if (validateId(id)) {
    res.sendStatus(INVALID_PARAMETERS_CODE);

    return;
  }

  const user = getUserById(id);

  if (!user) {
    res.sendStatus(NOT_EXIST_CODE);

    return;
  }

  deleteUser(id);
  res.sendStatus(SUCCESSFUL_DELETION_CODE);
}

function patch(req, res) {
  const id = prepareIdFromReq(req);

  const dataToUpdate = {
    ...req.body,
    id,
  };

  if (validateId(id) || typeof dataToUpdate.name !== 'string') {
    res.sendStatus(INVALID_PARAMETERS_CODE);

    return;
  }

  const user = getUserById(id);

  if (!user) {
    res.sendStatus(NOT_EXIST_CODE);

    return;
  }

  const updatedUser = updateUser(dataToUpdate);

  res.send(updatedUser);
}

function post(req, res) {
  const dataToPost = {
    ...req.body,
  };

  if (!dataToPost.name) {
    res.sendStatus(INVALID_PARAMETERS_CODE);

    return;
  }

  const createdUser = createUser(dataToPost);

  res
    .status(SUCCESSFUL_CREATION_CODE)
    .send(createdUser);
}

module.exports = {
  get,
  getOne,
  remove,
  patch,
  post,
};
