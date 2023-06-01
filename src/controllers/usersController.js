'use strict';

const usersModel = require('../models/users');

const getAllUsers = (req, res) => {
  const users = usersModel.getAllUsers();

  return res.status(200).send(users);
};

const getUserById = (req, res) => {
  const { userId } = req.params;

  const user = usersModel.getUserById(Number(userId));

  if (!userId) {
    return res.sendStatus(400);
  }

  if (!user) {
    return res.status(404).send(`There is no user with id ${userId}`);
  }

  return res.status(200).send(user);
};

const createUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.sendStatus(400);
  }

  const newUser = usersModel.createUser(name);

  return res.status(201).send(newUser);
};

const changeUserById = (req, res) => {
  const { userId } = req.params;
  const { name } = req.body;

  const userIdNumber = Number(userId);

  const user = usersModel.getUserById(userIdNumber);

  if (!name || !userIdNumber) {
    return res.sendStatus(400);
  }

  if (!user) {
    return res.status(404).send(`There is no user with id ${userIdNumber}`);
  }

  usersModel.changeUserById(userIdNumber, name);

  return res.status(200).send(user);
};

const deleteUserById = (req, res) => {
  const { userId } = req.params;

  const userIdNumber = Number(userId);

  if (!userIdNumber) {
    return res.sendStatus(400);
  }

  const user = usersModel.getUserById(userIdNumber);

  if (!user) {
    return res.status(404).send(`There is no user with id ${userIdNumber}`);
  }

  usersModel.deleteUserById(userIdNumber);

  return res.sendStatus(204);
};

module.exports = {
  getAllUsers,
  getUserById,
  deleteUserById,
  createUser,
  changeUserById,
};
