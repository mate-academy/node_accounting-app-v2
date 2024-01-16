'use strict';

const getMaxId = (users) => {
  if (!users || users.length === 0) {
    return null;
  }

  const maxId = Math.max(...users.map(item => item.id));

  return maxId;
};

const findUser = (users, id) => {
  if (!Array.isArray(users) || typeof id !== 'number') {
    return null;
  }

  return users.find(user => user.id === id);
};

module.exports = {
  getMaxId,
  findUser,
};
