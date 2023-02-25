'use strict';

function generateId(elements) {
  return elements.length > 0
    ? Math.max(...elements.map(element => element.id)) + 1
    : 1;
}

module.exports = { generateId };
