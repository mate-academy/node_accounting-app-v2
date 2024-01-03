'use strict';

const getNewId = (ids) => {
  if (ids.length > 0) {
    ids.sort((id1, id2) => id1 - id2);

    return ids[ids.length - 1] + 1;
  }

  return 1;
};

module.exports = {
  getNewId,
};
