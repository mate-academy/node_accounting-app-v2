'use strict';

function deleteItemById(itemsArray, itemId) {
  const itemIndex = itemsArray.findIndex(({ id }) => id === itemId);

  itemsArray.splice(itemIndex, 1);
}

module.exports = {
  deleteItemById,
};
