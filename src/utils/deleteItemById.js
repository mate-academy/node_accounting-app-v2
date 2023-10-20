'use strict';

function deleteItemById(itemsArray, itemId) {
  return itemsArray.filter(({ id }) => id !== itemId);
}

module.exports = {
  deleteItemById,
};
