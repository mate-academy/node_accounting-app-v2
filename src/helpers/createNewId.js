'use strict';

function createNewId(entities) {
  const maxId = entities.length
    ? Math.max(...entities.map(entity => entity.id))
    : 0;

  return maxId + 1;
}

module.exports = createNewId;
