let users = [];

function getAll() {
  return users;
}

function getById(id) {
  return users.find((user) => user.id === id);
}

function create(name) {
  const user = {
    id: Math.trunc(Date.now() + Math.random()),
    name,
  };

  users.push(user);

  return user;
}

function removeById(id) {
  const index = users.findIndex((user) => user.id === id);

  if (index === -1) {
    return;
  }

  const [removedUser] = users.splice(index, 1);

  return removedUser;
}

function updateById({ id, name }) {
  const user = getById(id);

  if (!user) {
    return;
  }

  return Object.assign(user, { name });
}

const clear = () => {
  users = [];
};

const userService = {
  getAll,
  getById,
  create,
  removeById,
  updateById,
  clear,
};

module.exports = {
  userService,
};
