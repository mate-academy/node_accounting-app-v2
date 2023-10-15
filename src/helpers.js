'use strict';

const findById = (items, itemId) => {
  const foundItem = items.find(item => item.id === itemId);

  return foundItem || null;
};

function getNewId(items) {
  if (!items.length) {
    return 1;
  }

  const ids = items.map(item => item.id);
  const newId = Math.max(...ids) + 1;

  return newId;
}

module.exports = {
  findById,
  getNewId,
};
