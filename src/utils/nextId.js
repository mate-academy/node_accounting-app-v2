'use strict';

function nextId(items) {
  if (!items.length) {
    return 0;
  }

  return Math.max(...items.map(({ id }) => id)) + 1;
}

module.exports = { nextId };
