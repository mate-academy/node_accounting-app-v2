'use strict';

function getId(array) {
  const maxId = array.length
    ? Math.max(...array.map(({ id }) => id))
    : 0;

  return maxId + 1;
}

module.exports.getId = getId;
