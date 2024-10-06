const { createId } = require('./createId');

const createAPI = (array) => {
  return {
    get: (id) => {
      return array.find((elem) => elem.id === id);
    },
    add: (elem) => {
      const elemWithId = {
        id: createId(array),
        ...elem,
      };

      array.push(elemWithId);

      return elemWithId;
    },
    update: (newElem) => {
      const { id } = newElem;

      return array.map((elem) => (elem.id === +id ? newElem : elem));
    },
    delete: (id) => {
      const index = array.findIndex((elem) => elem.id === id);

      if (index !== -1) {
        array.splice(index, 1);
      }

      return array;
    },
  };
};

module.exports = { createAPI };
