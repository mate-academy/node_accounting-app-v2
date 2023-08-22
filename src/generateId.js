'use strict';

function generateId(arr) {
  if (arr.length === 0) {
    return 0;
  }

  const ids = arr.map(item => item.id);
  const nextId = Math.max(...ids) + 1;

  return nextId;
};

module.exports = { generateId };
