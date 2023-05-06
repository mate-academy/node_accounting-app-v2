'use strict';

const getNewId = (array) => {
  return array.length
    ? Math.max(...array.map(element => element.id)) + 1
    : 1;
};

module.exports = { getNewId };
