'use strict';

const addUniqueId = (items) => (
  Math.max(...items.map(item => item.id), 0) + 1
);

module.exports = {
  addUniqueId,
};
