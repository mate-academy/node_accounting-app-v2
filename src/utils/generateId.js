'use strict';

const generateId = (items) => {
  if (!items.length) {
    return 1;
  }

  const allIds = items.map(({ id }) => id);
  const maxId = Math.max(...allIds);

  return maxId + 1;
};

module.exports = { generateId };
