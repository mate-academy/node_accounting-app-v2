'use strict';

const DEFAULT_START_ID = 1;

const generateUniqueID = (arr) => {
  let id = arr.length > 0
    ? Math.max(...arr.map((item) => item.id)) + DEFAULT_START_ID
    : DEFAULT_START_ID;

  while (arr.some((item) => item.id === id)) {
    id++;
  }

  return id;
};

module.exports = {
  generateUniqueID,
};
