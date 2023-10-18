'use strict';

const { getItemById } = require('./getItemById');

function updateItem(itemsArray, itemData) {
  const currentItem = getItemById(itemsArray, itemData.id);

  Object.assign(currentItem, itemData);

  return currentItem;
}

module.exports = {
  updateItem,
};
