const findItemById = (arr, id) =>
  arr.find((item) => String(item.id) === String(id));

const getId = (arr) => {
  return arr.reduce((init, { id }) => {
    if (init <= id) {
      return id + 1;
    }

    return init;
  }, 1);
};

const getFilteredArrayById = (arr, id) => {
  if (!id) {
    return arr;
  }

  return [...arr].filter((item) => Number(item.id) !== Number(id));
};

module.exports = {
  findItemById,
  getId,
  getFilteredArrayById,
};
