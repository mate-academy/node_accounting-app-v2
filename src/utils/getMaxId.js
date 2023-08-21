'use strict';

const getMaxId = (data) => {
  const ids = data.map(item => item.id);

  return ids.length > 0 ? Math.max(...ids) : 0;
};

module.exports = { getMaxId };
