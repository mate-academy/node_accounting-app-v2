'use strict';

function getNextId(datas) {
  const datasId = datas.map(({ id }) => id);

  return datasId.reduce((acum, id) => {
    if (acum < id) {
      return id;
    }

    return acum;
  }, 0) + 1;
}

module.exports = {
  getNextId,
};
