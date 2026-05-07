let userId = 1;

const users = [];

const services = {
  getUsers() {
    return users;
  },
  getUser(id) {
    return users.find((user) => user.id === id) || null;
  },
  createUser(name) {
    const newUser = { name, id: userId++ };

    users.push(newUser);

    return newUser;
  },
  deleteUser(id) {
    const index = users.findIndex((user) => user.id === id);

    if (index === -1) {
      return null;
    }

    const deletedUser = users.splice(index, 1)[0];

    return deletedUser;
  },
  updateUser(id, updatedUser) {
    const index = users.findIndex((user) => user.id === id);

    if (index === -1) {
      return null;
    }

    Object.assign(users[index], updatedUser);

    return users[index];
  },
  reset() {
    userId = 1;
    users.length = 0;
  },
};

module.exports = {
  services,
};
