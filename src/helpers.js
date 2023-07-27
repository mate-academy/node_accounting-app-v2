'use strict';

const createNewId = (array) => {
  if (array.length === 0) {
    return 1;
  }

  const ids = array.map(element => element.id);
  const newId = Math.max(...ids) + 1;

  return newId;
};

module.exports = {
  createNewId,
};
