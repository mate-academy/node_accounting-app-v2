'use strict';

const createId = (usedIds) => {
  const ids = usedIds.map(item => item.id);

  const maxId = ids.length
    ? Math.max(...ids)
    : 0;

  return maxId + 1;
};

module.exports = { createId };
