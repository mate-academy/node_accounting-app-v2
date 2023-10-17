'use strict';

function getItemById(itemsArray, itemId) {
  return itemsArray.find(({ id }) => id === itemId);
}

module.exports = {
  getItemById,
};
