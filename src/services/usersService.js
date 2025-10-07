const users = [];
let idCounter = 1;

function getAll() {
  return [...users];
}

function getById(id) {
  return users.find((u) => u.id === Number(id)) || null;
}

function create(name) {
  const user = { id: idCounter++, name };

  users.push(user);

  return user;
}

function update(id, name) {
  const user = getById(id);

  if (!user) {
    return null;
  }

  if (name !== undefined) {
    user.name = name;
  }

  return user;
}

function remove(id) {
  const index = users.findIndex((u) => u.id === Number(id));

  if (index === -1) {
    return null;
  }

  return users.splice(index, 1)[0];
}

function reset() {
  users.length = 0;
  idCounter = 1;
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  reset,
};
