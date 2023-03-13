'use strict';

const generateId = (arr) => {
  const arrIds = arr.map(element => element.id);

  const newId = Math.max(...arrIds, 0) + 1;

  return newId;
};

module.exports = {
  generateId,
};
