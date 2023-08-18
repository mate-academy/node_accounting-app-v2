'use strict';

const getNewId = (items) => {
  let maxId = 0;

  for (const item of items) {
    if (item.id >= maxId) {
      maxId = item.id;
    }
  }

  return maxId + 1;
};

module.exports = { getNewId };
