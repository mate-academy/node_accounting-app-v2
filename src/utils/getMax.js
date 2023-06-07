'use strict';

const getMax = (array) => {
  if (array.length === 0) {
    return 1;
  }

  const maxId = Math.max(...array.map(({ id }) => id));

  return maxId + 1;
};

module.exports = {
  getMax,
};
