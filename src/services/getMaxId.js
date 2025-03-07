function getMaxId(elements) {
  return Math.max(...elements.map((element) => element.id), 0);
}

module.exports = { getMaxId };
