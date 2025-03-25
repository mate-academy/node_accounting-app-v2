function generateId(currentList) {
  if (currentList.length === 0) {
    return 1;
  }

  const biggestId = Math.max(...currentList.map((item) => item.id));

  return biggestId + 1;
}

module.exports = {
  generateId,
};
