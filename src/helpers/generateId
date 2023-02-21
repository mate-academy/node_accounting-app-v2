'use strict';

function generateId(arr) {
  const ids = arr.map(item => item.id);

  const maxId = ids.length
    ? Math.max(...ids)
    : 0;

  return maxId + 1;
}

module.exports = {
  generateId,
};
