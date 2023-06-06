'use strict';

const getNewId = (dataArray) => {
  if (!dataArray.length) {
    return 1;
  }

  const biggestId = Math.max(...dataArray.map(({ id }) => id));

  return biggestId + 1;
};

module.exports = { getNewId };
