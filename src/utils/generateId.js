'use strict';

const generateId = () => {
  return Math.floor(Math.random() * 1000);
};

module.exports = {
  generateId,
};
