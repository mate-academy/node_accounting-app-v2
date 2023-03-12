'use strict';

const generateNewId = (elements) => {
  const maxId = Math.max(...elements.map(element => element.id), 0);

  return maxId + 1;
};

module.exports = { generateNewId };
