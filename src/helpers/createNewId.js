'use strict';

function createNewId(collection) {
  const ids = collection.map(item => item.id);
  const maxId = ids.length
    ? Math.max(...ids)
    : 0;

  return maxId + 1;
}

module.exports.createNewId = createNewId;
