'use strict';

const getNewId = (data) => {
  return Math.max(...data.map(({ id }) => id), 0) + 1;
};

module.exports = {
  getNewId,
};
