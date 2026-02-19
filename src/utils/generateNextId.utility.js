const generateNextId = (items = []) => {
  if (!Array.isArray(items) || !items.length) {
    return 1;
  }

  return Math.max(...items.map((item) => Number(item.id))) + 1;
};

module.exports = {
  generateNextId,
};
