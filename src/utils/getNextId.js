'use strict';

const getNextId = (arr) => {
  const maxId = Math.max(...arr.map(item => item.id), 0);

  return maxId + 1;
};

module.exports = {
  getNextId,
};
