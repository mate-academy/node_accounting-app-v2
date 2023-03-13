'use strict';

function getId(data) {
  const ids = data.map(unitInfo => unitInfo.id);
  const newId = Math.max(...ids, 0) + 1;

  return newId;
}

module.exports = {
  getId,
};
