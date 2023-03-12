'use strict';

const createNewId = (list) => {
  return Math.max(...list.map(item => item.id), 0) + 1;
};

module.exports = { createNewId };
