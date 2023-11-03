'use strict';

const {
  generateUniqueID,
  findUser,
  getAllUsers,
  findIndexOfUser,
  deleteUserByIndex,
  addNewUser,
} = require('../services/userService.js');
const { checkId, checkIfItemFound } = require('../helpers.js');

const getUsers = (req, res) => {
  const users = getAllUsers();

  if (!users) {
    res.sendStatus(404);

    return;
  }

  res.status(200).send(users);
};

const createUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = {
    id: generateUniqueID(),
    name,
  };

  addNewUser(newUser);

  res.status(201).send(newUser);
};

const getUserById = (req, res) => {
  const { id } = req.params;

  checkId(res, id);

  const foundUser = findUser(id);

  checkIfItemFound(res, foundUser);

  res.status(200).send(foundUser);
};

const deleteUser = (req, res) => {
  const { id } = req.params;

  checkId(res, id);

  const foundIndex = findIndexOfUser(id);

  if (foundIndex === -1) {
    res.sendStatus(404);

    return;
  }

  deleteUserByIndex(foundIndex);

  res.sendStatus(204);
};

const modifyUser = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  checkId(res, id);

  const foundUser = findUser(id);

  checkIfItemFound(res, foundUser);

  foundUser.name = name;

  res.status(200).send(foundUser);
};

module.exports = {
  getUsers,
  createUser,
  getUserById,
  deleteUser,
  modifyUser,
};
