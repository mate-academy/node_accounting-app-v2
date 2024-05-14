function getId(collection) {
  return collection.length
    ? Math.max(...collection.map((val) => val.id)) + 1
    : 1;
}

module.exports = {
  getId,
};
