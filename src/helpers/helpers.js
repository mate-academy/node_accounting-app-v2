'use strict';

const getMaxId = arr => {
  if (arr.length === 0) {
    return 1;
  }

  const mxID = (Math.max(...arr.map(item => item.id))) + 1;

  // eslint-disable-next-line no-console
  console.log(arr);

  return mxID;
};

module.exports = {
  getMaxId,
};
