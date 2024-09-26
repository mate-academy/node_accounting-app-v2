'use strict';

const getNewId = (data) => {
  if (!data.length) {
    return 1;
  }

  return Math.max(...data.map((item) => item.id)) + 1;
};

module.exports = { getNewId };
