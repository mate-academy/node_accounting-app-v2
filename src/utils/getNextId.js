'use strict';

const getNextId = (arr) => {
  const maxId = Math.max(arr.map(item => item.id));

  return maxId ? maxId + 1 : 1;
};

module.exports = {
  getNextId,
};
