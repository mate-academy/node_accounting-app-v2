let users = [];

function getAll() {
  return users;
}

function getById(id) {
  return users.find((user) => user.id === +id);
}

function create(name) {
  const user = { id: Date.now(), name };

  users.push(user);

  return user;
}

function deleteById(id) {
  const index = users.findIndex((u) => u.id === +id);

  if (index === -1) {
    return null;
  }

  const [user] = users.splice(index, 1);

  return user;
}

function update({ id, name }) {
  const user = users.find((u) => u.id === +id);

  if (!user) {
    return null;
  }

  return Object.assign(user, { name });
}

const resetUsers = () => {
  users = [];
};

module.exports = {
  getAll,
  getById,
  create,
  deleteById,
  update,
  users,
  resetUsers,
};
