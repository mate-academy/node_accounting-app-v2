'use strict';

const generateId = (data) => {
  const nextId = Math.max(...data.map(element => element.id), 0) + 1;

  return nextId;
};

module.exports = {
  generateId,
};
