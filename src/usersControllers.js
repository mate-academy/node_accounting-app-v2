'use strict';

const {
  getUsers,
  createUser,
  getOneUser,
  deleteUser,
  updateUser,
} = require('./usersServices');

const getAllUsers = (request, response) => {
  const users = getUsers();

  response.send(users);
};

const postNewUser = (request, response) => {
  try {
    const { name } = request.body;
    const newUser = createUser(name);

    response.statusCode = 201;
    response.send(newUser);
  } catch (err) {
    response.sendStatus(400);
  }
};

const getUserById = (request, response) => {
  try {
    const { id } = request.params;
    const user = getOneUser(id);

    response.send(user);
  } catch (err) {
    response.sendStatus(404);
  }
};

const removeUser = (request, response) => {
  try {
    const { id } = request.params;

    deleteUser(id);
    response.sendStatus(204);
  } catch (err) {
    response.sendStatus(404);
  }
};

const updateUserInfo = (request, response) => {
  try {
    const { id } = request.params;
    const { name } = request.body;

    const updatedUser = updateUser(id, name);

    response.send(updatedUser);
  } catch (err) {
    if (err.message === 'User does not exist.') {
      response.sendStatus(404);
    }

    if (err.message === 'Name was not provided.') {
      response.sendStatus(422);
    }
  }
};

module.exports = {
  getAllUsers,
  postNewUser,
  getUserById,
  removeUser,
  updateUserInfo,
};
