let users = [];

function start() {
  users = [];
}

function getAll() {
  return users;
}

function getById(id) {
  return users.find((user) => user.id === +id);
}

function create(name) {
  const user = { id: Math.floor(Math.random() * 1000000), name };

  users.push(user);

  return user;
}

function deleteById(id) {
  const index = users.findIndex((userToDelete) => userToDelete.id === +id);

  if (index === -1) {
    return;
  }

  const [user] = users.splice(index, 1);

  return user;
}

function update({ id, name }) {
  const user = users.find((userToUpdate) => userToUpdate.id === +id);

  if (!user) {
    return;
  }

  return Object.assign(user, { name });
}

module.exports = {
  start,
  getAll,
  getById,
  create,
  deleteById,
  update,
};
