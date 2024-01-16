'use strict';

function getNewId(items) {
  if (!items.length) {
    return 1;
  }

  return Math.max(...items.map(item => item.id)) + 1;
}

module.exports = {
  getNewId,
};
