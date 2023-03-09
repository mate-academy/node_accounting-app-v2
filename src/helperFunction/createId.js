'use strict';

function createId(items) {
  return Math.max(...items.map(item => item.id), 0) + 1;
}

module.exports = {
  createId,
};
