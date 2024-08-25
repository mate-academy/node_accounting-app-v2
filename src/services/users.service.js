let users = [];

function clearUsers() {
  users = [];
}

function getUsers() {
  return users;
}

function createUser(name) {
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
  clearUsers,
  getUsers,
  createUser,
  getUser,
  removeUser,
  updateUser,
};
