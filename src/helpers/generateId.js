'use strict';

function generateId(dataArray) {
  const dataIds = dataArray.map(item => item.id);

  const maxId = dataIds.length
    ? Math.max(...dataIds)
    : 0;

  return maxId + 1;
}

module.exports = {
  generateId,
};
