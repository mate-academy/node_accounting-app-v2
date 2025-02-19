'use strict';

function getId(list) {
  const ids = list.map(user => user.id);
  const maxId = ids.length > 0 ? Math.max(...ids) : 0;

  return maxId + 1;
}

module.exports = {
  getId,
};
