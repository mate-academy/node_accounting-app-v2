'use strict';

function getNewId(data) {
  const dataIds = data.map(item => item.id);

  const maxId = dataIds.length
    ? Math.max(...dataIds)
    : 0;

  return maxId + 1;
};

module.exports = {
  getNewId,
};
