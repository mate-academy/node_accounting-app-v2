// function getId() {
//   return collection.length
//     ? Math.max(...collection.map((val) => val.id)) + 1
//     : 1;
// }

function getId(collection) {
  return collection.length
    ? Math.max(...collection.map((val) => val.id)) + 1
    : 1;
}

// function getById(collection, id) {
//   return collection.find((item) => String(item.id) === id);
// }

module.exports = {
  getId,
  // getById,
};
