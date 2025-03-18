const users = new Map();

const userService = {
  getAll: () => Array.from(users.values()),

  getById: (id) => users.get(id),

  create: (name) => {
    const id = Math.trunc(Date.now() + Math.random());
    const user = { id, name };

    users.set(id, user);

    return user;
  },

  removeById: (id) => {
    const user = users.get(id);

    if (user) {
      users.delete(id);

      return true;
    }

    return false;
  },

  updateById: ({ id, name }) => {
    const user = users.get(id);

    if (!user) {
      return null;
    }

    const updatedUser = { ...user, name };

    users.set(id, updatedUser);

    return updatedUser;
  },

  clear: () => {
    users.clear();
  },
};

module.exports = {
  userService,
};
