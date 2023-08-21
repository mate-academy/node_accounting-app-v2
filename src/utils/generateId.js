'use strict';

function generateId(data) {
  if (data.length === 0) {
    return 1;
  }

  const ids = data.map(item => item.id);

  return Math.max(...ids) + 1;
}

module.exports = {
  generateId,
};
