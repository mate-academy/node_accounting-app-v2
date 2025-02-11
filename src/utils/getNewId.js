const getNewId = (items) => {
  if (items.length) {
    return Math.max(items.map((item) => item.id)) + 1;
  }

  return 0;
};

module.exports = {
  getNewId,
};
