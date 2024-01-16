'use strict';

function getIndex(storage, currentId) {
  return storage.findIndex(({ id }) => id === currentId);
}

module.exports = {
  getIndex
};
