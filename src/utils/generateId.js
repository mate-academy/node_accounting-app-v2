'use strict';

const generateId = () => {
  return Date.now() + Math.floor(Math.random() * 1000);
};

module.exports = {
  generateId,
};
