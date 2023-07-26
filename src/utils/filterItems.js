'use strict';

const filterItems = (items, callbacks) => {
  if (callbacks.length) {
    return items.filter(item => callbacks.every(callback => callback(item)));
  }

  return items;
};

module.exports = { filterItems };
