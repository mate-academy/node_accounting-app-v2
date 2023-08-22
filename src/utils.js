'use strict';

function generateId(arr) {
  if (arr.length === 0) {
    return 1;
  }

  const id = Math.max(...arr.map(el => el.id)) + 1;

  return id;
}

module.exports = {
  generateId,
};
