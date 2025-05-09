async function getAll(array) {
  return array;
}

async function getById(array, id) {
  const numID = +id;

  return array.find((item) => item.id === numID) || null;
}

async function deleteById(array, id) {
  const numID = +id;
  const index = array.findIndex((item) => item.id === numID);

  if (index === -1) {
    return false;
  }
  array.splice(index, 1);

  return true;
}

module.exports = {
  getAll,
  getById,
  deleteById,
};
