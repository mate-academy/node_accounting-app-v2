'use strict';

function getNewId(storage) {
  if (storage.length === 0) {
    return 0;
  }

  return storage.reduce((max, obj) => (
    obj.id > max.id ? obj : +max
  ), { id: -Infinity }).id + 1;
}

module.exports = {
  getNewId,
};
