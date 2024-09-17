'use strict';

function createId(array) {
  if (array.length === 0) {
    return 1;
  }

  const ids = array.map(item => item.id);

  return Math.max(...ids) + 1;
}

module.exports = {
  createId,
};
