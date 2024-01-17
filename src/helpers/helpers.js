'use strict';

const nextId = (items) => {
  if (!items.length) {
    return 1;
  }

  const ids = items.map(({ id }) => id);
  const maxId = Math.max(...ids);

  return maxId + 1;
};

module.exports = { nextId };
