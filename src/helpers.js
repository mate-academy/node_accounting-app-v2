'use strict';

const getNewId = (arr) => {
  const maxId = Math.max(...arr.map((arrElement) => arrElement.id), 0);
  const newId = maxId + 1;

  return newId;
};

module.exports = {
  getNewId,
};
