let users = [];
let uniqueId = 1;

function clearUsers() {
  users = [];
}

function getAll() {
  return users;
}

function getById(id) {
  return users.find((user) => user.id === id) || null;
}

function create(name) {
  const user = {
    id: uniqueId,
    name,
  };

  uniqueId += 1;
  users.push(user);

  return user;
}

function deleteById(id) {
  users = users.filter((user) => user.id !== id);
}

function update({ id, name }) {
  const userToUpdate = getById(id);

  if (!userToUpdate) {
    return;
  }

  return Object.assign(userToUpdate, { name });
}

module.exports = {
  clearUsers,
  getAll,
  getById,
  create,
  deleteById,
  update,
};
