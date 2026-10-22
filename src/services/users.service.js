const users = [];
let idCounter = 1;

function getAll() {
  return users;
}

function getById(id) {
  return users.find((user) => user.id === id);
}

function create(name) {
  idCounter++;

  const user = { id: idCounter, name };

  users.push(user);

  return user;
}

function deleteById(id) {
  const index = users.findIndex((u) => u.id === id);

  if (index === -1) {
    return;
  }

  const [user] = users.splice(index, 1);

  return user;
}

function update({ id, name }) {
  const user = getById(id);

  if (!user) {
    return;
  }

  return Object.assign(user, { name });
}

function reset() {
  users.length = 0;
  idCounter = 0;
}

module.exports = {
  getAll,
  getById,
  create,
  deleteById,
  update,
  reset,
};
