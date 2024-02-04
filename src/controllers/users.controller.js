'use strict';

const commonService = require('../services/common.service');
const usersService = require('../services/users.service');

const getUsers = (req, res) => {
  res.send(usersService.getUsers());
};

const createUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    commonService.sendError(
      res,
      commonService.response.requiredParameter,
      commonService.response.requiredParamaterMessage
    );

    return;
  }

  res.statusCode = commonService.response.created;
  res.send(usersService.createUser(name));
};

const getUserById = (req, res) => {
  const { id } = req.params;
  const user = usersService.getUserById(id);

  if (!user) {
    commonService.sendError(
      res,
      commonService.response.notFound,
      commonService.response.notFoundMessage
    );

    return;
  }

  res.send(user);
};

const deleteUserById = (req, res) => {
  const { id } = req.params;
  const exists = usersService.getUserById(id);

  if (!exists) {
    commonService.sendError(
      res,
      commonService.response.notFound,
      commonService.response.notFoundMessage
    );

    return;
  }

  usersService.removeUserById(id);
  res.sendStatus(commonService.response.noContent);
};

const updateUserName = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const user = usersService.getUserById(id);

  if (!user) {
    commonService.sendError(
      res,
      commonService.response.notFound,
      commonService.response.notFoundMessage
    );

    return;
  }

  if (!name) {
    commonService.sendError(
      res,
      commonService.response.requiredParameter,
      commonService.response.requiredParamaterMessage
    );

    return;
  }

  Object.assign(user, { name });
  res.send(user);
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  deleteUserById,
  updateUserName,
};
