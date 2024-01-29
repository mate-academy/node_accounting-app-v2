'use strict';

function generateNewId(array) {
  const ids = array.map(obj => obj.id);

  return Math.max(...ids) + 1;
}

module.exports = { generateNewId };
