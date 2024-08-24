let users = [];

function getUsers() {
  return users;
}

function addUser(name) {
  const newUser = { id: users.length, name };

  users.push(newUser);

  return newUser;
}

function getUser(id) {
  return users[id];
}

function removeUser(id) {
  const newUsers = users.filter((user) => user.id === id);

  users = newUsers;
}

function updateUser(id, name) {
  const user = getUser(id);

  Object.assign(user, { name });

  return user;
}

module.exports = {
  getUsers,
  addUser,
  getUser,
  removeUser,
  updateUser,
};
