'use strict';

function generateNewId(items) {
  return items.length
    ? Math.max(...items.map(item => item.id)) + 1
    : 0;
};

module.exports = {
  generateNewId,
};
