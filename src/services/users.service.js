const users = [];

let maxUserId = -1;

function getAll() {
  return users;
}

function getById(id) {
  return users.find((user) => user.id === id);
}

function create(name) {
  const id = ++maxUserId;
  const user = { id, name };

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
  const user = users.find((u) => u.id === id);

  if (!user) {
    return;
  }

  return Object.assign(user, { name });
}

module.exports = {
  users,
  create,
  getAll,
  getById,
  update,
  deleteById,
};
