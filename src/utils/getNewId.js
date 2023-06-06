'use strict';

const getNewId = entries => {
  if (entries.length === 0) {
    return 1;
  }

  const ids = entries.map(entry => entry.id);

  return Math.max(...ids) + 1;
};

module.exports = {
  getNewId,
};
