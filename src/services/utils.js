'use strict';

const getMaxId = (users) => {
  const maxId = Math.max(...users.map(user => user.id), 0);

  return maxId + 1;
};

module.exports = {
  getMaxId,
};
