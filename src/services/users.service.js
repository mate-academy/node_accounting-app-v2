const users = [];

function getAll() {
  return users;
}

function resetAllUsers() {
  users.length = 0;
}

function getUserById(id) {
  const index = users.findIndex((e) => e.id === parseFloat(id));

  if (index === -1) {
    return;
  }

  return users[index];
}

function create(user) {
  if (!user.name) {
    throw new Error('Name is required');
  }

  const id = users.length + 1;

  const newUser = {
    id,
    name: user.name,
  };

  users.push(newUser);

  return newUser;
}

function update(id, user) {
  const foundUser = users.find((e) => e.id === parseFloat(id));

  if (!foundUser) {
    return;
  }

  return Object.assign(foundUser, { name: user.name });
}

function remove(id) {
  const index = users.findIndex((e) => e.id === parseFloat(id));

  if (index === -1) {
    return;
  }

  users.splice(index, 1);

  return true;
}

module.exports = {
  getAll,
  getUserById,
  create,
  update,
  remove,
  resetAllUsers,
};
