const users = [];
let currentId = 0;

function getAll() {
  return users;
}

function getById(id) {
  return users.find((user) => user.id === id);
}

function create(name) {
  const user = { id: currentId + 1, name };

  currentId++;
  users.push(user);

  return user;
}

function deleteById(id) {
  const index = users.findIndex((userItem) => userItem.id === id);

  if (index === -1) {
    return;
  }

  const [user] = users.splice(index, 1);

  return user;
}

function update({ id, name }) {
  const user = users.find((userItem) => userItem.id === id);

  if (!user) {
    return;
  }

  return Object.assign(user, { name });
}

function clear() {
  users.length = 0;
  currentId = 0;
}

const usersService = {
  getAll,
  getById,
  create,
  deleteById,
  update,
  clear,
};

module.exports = {
  usersService,
};
