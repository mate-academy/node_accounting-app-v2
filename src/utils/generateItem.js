'use strict';

const { generateId } = require('./generateId');

const generateItem = (params) => {
  return {
    id: generateId(),
    ...params,
  };
};

module.exports = {
  generateItem,
};
