function createMaxId(array) {
  if (array.length === 0) {
    return 1;
  }

  const maxId = Math.max(...array.map((obj) => obj.id));

  return maxId + 1;
}

module.exports = {
  createMaxId,
};
