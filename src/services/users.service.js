let users = [];

const userService = {
  getAll: () => users,

  getUserById: (id) => users.find((user) => user.id === id),

  create: (name) => {
    const id = Math.floor(Date.now() + Math.random());
    const newUser = { id, name };

    users.push(newUser);

    return newUser;
  },

  remove: (id) => {
    const userToDelete = users.find((user) => user.id === id);

    if (userToDelete) {
      users = users.filter((user) => user.id !== userToDelete.id);
    }

    return userToDelete;
  },

  update: ({ id, name }) => {
    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      return null;
    }

    const newUser = { ...users[userIndex], name };

    users[userIndex] = newUser;

    return newUser;
  },

  clear: () => {
    users = [];
  },
};

module.exports = {
  userService,
};
