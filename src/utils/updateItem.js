'use strict';

const { getItemById } = require('./getItemById');

function updateItem(itemsArray, itemData) {
  const currentItem = getItemById(itemsArray, itemData.id);
  const itemIndex = itemsArray.findIndex(({ id }) => id === itemData.id);
  const updatedItem = {
    ...currentItem,
    ...itemData,
  };

  itemsArray.splice(itemIndex, 1, updatedItem);

  return updatedItem;
}

module.exports = {
  updateItem,
};
