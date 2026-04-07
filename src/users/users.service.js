const users = [];
let nextId = 1;

function clear() {
  users.length = 0;
  nextId = 1;
}

function getAll() {
  return users;
}

function getById(id) {
  return users.find((user) => user.id === Number(id));
}

function createUser(name) {
  const user = { id: nextId++, name };

  users.push(user);

  return user;
}

function updateUser({ id, name }) {
  const user = users.find((userToUpdate) => userToUpdate.id === Number(id));

  if (!user) {
    return;
  }

  if (name !== undefined) {
    user.name = name;
  }

  return user;
}

function deleteById(id) {
  const index = users.findIndex(
    (userToDelete) => userToDelete.id === Number(id),
  );

  if (index === -1) {
    return;
  }

  const [user] = users.splice(index, 1);

  return user;
}

module.exports = {
  getAll,
  getById,
  createUser,
  deleteById,
  updateUser,
  clear,
};
