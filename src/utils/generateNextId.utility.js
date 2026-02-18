const generateNextId = (items = []) => {
  if (!items.length) {
    return 1;
  }

  return Math.max(...items.map((user) => user.id)) + 1;
};

module.exports = {
  generateNextId,
};
