'use strict';

function genId(data) {
  const arrId = data.map(el => el.id);
  const id = Math.max(...arrId, 0) + 1;

  return id;
};

module.exports = { genId };
