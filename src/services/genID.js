'use strict';

function generateNewID(list) {
  const ids = list.map(item => item.id);
  const newID = ids.length > 0 ? Math.max(...ids) + 1 : 1;

  return newID;
}

module.exports = {
  generateNewID,
};
