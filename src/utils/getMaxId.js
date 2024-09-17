'use strict';

function getMaxId(array) {
  const ids = array.map(item => item.id);

  return Math.max(ids) + 1;
}

module.exports = { getMaxId };
