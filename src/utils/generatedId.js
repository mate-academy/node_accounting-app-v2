'use strict';

const generatedId = (arr) => {
  const newId = Math.max(0, ...arr.map(item => item.id)) + 1;

  if (!arr.length) {
    return 1;
  }

  return newId;
};

module.exports = { generatedId };
