// eslint-disable-next-line no-unused-vars
const { User } = require('../model/user.model');

/**
 * @type {User[]}
 */
let users = [];

const getUsers = () => {
  return users;
};

/**
 * @param {User} user
 */
const createUser = (user) => {
  const name = user.name;

  if (!name) {
    return null;
  }

  let newUser;

  if (users.length !== 0) {
    newUser = {
      id: users[users.length - 1].id + 1,
      name,
    };
  }

  if (users.length === 0) {
    newUser = {
      id: users.length + 1,
      name,
    };
  }

  users.push(newUser);

  return newUser;
};

const getUserById = (id) => {
  return users.find((user) => user.id === Number(id));
};

const deleteUserById = (id) => {
  const findUser = getUserById(id);

  if (!findUser) {
    return null;
  }

  users = users.filter((user) => user.id !== Number(id));

  return findUser;
};

/**
 * @param {User} user
 * @param {number} id
 */

const updateUser = (user, id) => {
  const findUser = getUserById(id);

  if (!findUser) {
    return null;
  }

  return Object.assign(findUser, user);
};

module.exports = {
  getUsers,
  createUser,
  deleteUserById,
  getUserById,
  updateUser,
  users,
};
