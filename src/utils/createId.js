function createId(array) {
  const maxId = Math.max(...array.map((elem) => elem.id), 0);

  return maxId + 1;
}

module.exports = { createId };
