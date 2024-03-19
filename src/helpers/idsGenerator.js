'use strict';

function getNewId(array) {
  const newId = Math.max(...array.map((part) => part.id));

  return !array.length ? 1 : newId + 1;
}

module.exports = { getNewId };
