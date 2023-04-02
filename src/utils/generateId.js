'use strict';

const generateId = (items) => (
  Math.max(
    ...items.map(item => item.id), 0
  ) + 1
);

module.exports = { generateId };
