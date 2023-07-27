'use strict';

const createNewId = (users) => {
  const ids = users.map(({ id }) => id);

  if (ids.length === 0) {
    return 1;
  }

  return Math.max(...ids) + 1;
};

module.exports = { createNewId };
