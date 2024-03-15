'use strict';

const getMaxId = (items) => {
  return items.length
    ? Math.max(...items.map(item => item.id))
    : 0;
};

module.exports = getMaxId;
