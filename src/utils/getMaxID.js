const getMaxID = (arr) => {
  if (!arr.length) {
    return 1;
  }

  const arrIds = arr.map((el) => el.id);

  return Math.max(...arrIds) + 1;
};

module.exports = {
  getMaxID,
};
