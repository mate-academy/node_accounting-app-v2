const getNewId = (entrie) => {
  if (!entrie.length) {
    return 1;
  }

  const ids = entrie.map(entriePart => entriePart.id);
  const maxId = Math.max(...ids);

  return maxId + 1;
}

module.exports = { getNewId };
