'use strict';

const getNewId = (items) => {
  const ids = items.map(item => item.id);

  if (!ids.length) {
    return 1;
  }

  return Math.max(...ids) + 1;
};

module.exports = { getNewId };
