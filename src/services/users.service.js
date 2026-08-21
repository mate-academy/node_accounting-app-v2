let users = [];
let nextId = 1;

function getAll() {
  return users;
}

function getById(id) {
  return users.find((user) => user.id === id);
}

function create(name) {
  const user = { id: nextId++, name };

  users.push(user);

  return user;
}

function deleteById(id) {
  const index = users.findIndex((item) => item.id === id);

  if (index === -1) {
    return;
  }

  const [user] = users.splice(index, 1);

  return user;
}

function update({ id, ...changes }) {
  const user = users.find((item) => item.id === id);

  if (!user) {
    return;
  }

  return Object.assign(user, changes);
}

function reset() {
  users = [];
  nextId = 1;
}

const usersService = {
  getAll,
  getById,
  create,
  deleteById,
  update,
  reset,
};

module.exports = { usersService };
