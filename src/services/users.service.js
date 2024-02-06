'use strict';

module.exports = {
  getAll,
  getById,
  create,
  removeById,
  removeAll,
  update,
};

/**
 * @typedef {Object} User
 * @property {number} id
 * @property {string} name
*/

/** @type {User[]} */
const users = [];
let maxId = users.length;

function getAll() {
  return users;
}

/** @type {number} id */
function getById(id) {
  return users.find(user => user.id === id) || null;
}

/** @param {string} name */
function create(name) {
  const user = {
    id: maxId++,
    name,
  };

  users.push(user);

  return user;
}

/** @param {number} id */
function removeById(id) {
  const itemIndx = getIndexById(id);

  return itemIndx === -1
    ? null
    : removeByIndex(itemIndx);
}

/** @param {number} itemIndx */
function removeByIndex(itemIndx) {
  return users.splice(itemIndx, 1);
}

function removeAll() {
  users.splice(0, users.length);
  maxId = users.length;
}

/** @param {User} userSource */
function update(userSource) {
  const { id, ...restProps } = userSource;
  const userTarget = getById(id);

  if (userTarget) {
    Object.assign(userTarget, { ...restProps });
  }

  return userTarget;
}

/** @param {number} id */
function getIndexById(id) {
  return users.findIndex(user => user.id === id);
}
