'use strict';

function getNewId(entities) {
  return entities.length
    ? Math.max(...entities.map(entity => entity.id)) + 1
    : 1;
}

module.exports = {
  getNewId,
};
