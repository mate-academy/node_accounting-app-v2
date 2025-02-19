function getMaxId(array) {
  if (array.length === 0) {
    return 1;
  }

  const maxId = Math.max(...array.map((arr) => arr.id));

  return maxId + 1;
}

module.exports = getMaxId;
