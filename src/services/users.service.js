let users = [];

function getAll() {
  return users.sort((a, b) => a.id - b.id);
}

function getOne(id) {
  return users.find((item) => item.id === +id);
}

function addUser(user) {
  users.push(user);
}

function deleteUser(id) {
  users = users.filter((item) => item.id !== id);
}

function getIndexOf(user) {
  return users.indexOf(user);
}

function updateUser(index, data) {
  users[index] = data;

  return data;
}

function filterUsersById(userId) {
  return users.filter((user) => user.id === +userId);
}

module.exports = {
  getAll,
  getOne,
  addUser,
  deleteUser,
  getIndexOf,
  updateUser,
  filterUsersById,
};
