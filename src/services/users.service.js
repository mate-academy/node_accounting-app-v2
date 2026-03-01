let users;

function createUsers() {
  users = [];
}

function getId() {
  const ids = users.map((e) => e.id);

  return users.length === 0 ? 0 : Math.max(...ids) + 1;
}

function getAll() {
  return users;
}

function getById(id) {
  return users.find((u) => String(u.id) === String(id));
}

function create(name) {
  const user = { id: getId(), name: name };

  users.push(user);

  return user;
}

function deleteById(id) {
  const index = users.findIndex((u) => String(u.id) === String(id));

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

module.exports = {
  createUsers,
  getAll,
  getById,
  create,
  deleteById,
  update,
};
