'use strict';

const users = [];

const get = () => {
  return users;
};

const getById = ({ id }) => {
  return users.find(user => user.id === id) || null;
};

const create = ({ name }) => {
  let nextID = 0;

  if (users.length > 0) {
    nextID = users.sort((a, b) => a.id - b.id).at(-1).id + 1;
  }

  users.push({
    id: nextID, name,
  });

  return getById({ id: nextID });
};

const update = ({ id, name }) => {
  const user = getById({ id });

  if (user) {
    users.forEach(userItem => {
      if (userItem.id === id) {
        userItem.name = name;
      }
    });

    return getById({ id });
  }

  return null;
};

const remove = ({ id }) => {
  const index = users.findIndex(user => user.id === id);

  users.splice(index, 1);

  return index;
};

module.exports = {
  get,
  getById,
  create,
  update,
  remove,
};
