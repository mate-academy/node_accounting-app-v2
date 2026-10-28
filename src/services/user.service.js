const users = [];

function resetUsers() {
  users.length = 0;
}

function getAll() {
  return users;
}

function getById(id) {
  return users.find((user) => user.id === id) ?? null;
}

function create({ name }) {
  const id = users.length ? Math.max(...users.map((item) => item.id)) + 1 : 1;
  const user = { id, name };

  users.push(user);

  return user;
}

function update({ id, name }) {
  const user = users.find((item) => item.id === id);

  if (!user) {
    return;
  }

  return Object.assign(user, { name });
}

function deleteById(id) {
  const index = users.findIndex((item) => item.id === id);

  if (index === -1) {
    return;
  }

  const [user] = users.splice(index, 1);

  return user;
}

const userService = {
  getAll,
  getById,
  create,
  update,
  deleteById,
};

module.exports = {
  userService,
  resetUsers,
};
