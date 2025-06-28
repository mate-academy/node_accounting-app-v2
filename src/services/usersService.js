const users = [];
let nextUserId = 1;

const usersService = {
  getUsers: () => users,
  reset: () => {
    users.length = 0;
    nextUserId = 1;
  },
  createUser: (name) => {
    const user = { id: nextUserId++, name };

    users.push(user);

    return user;
  },

  getUser: (id) => {
    const user = users.find((u) => u.id === id);

    if (!user) {
      return null;
    }

    return user;
  },

  deleteUser: (id) => {
    const index = users.findIndex((u) => u.id === id);

    if (index === -1) {
      return false;
    }
    users.splice(index, 1);

    return true;
  },

  updateUser: (id, name) => {
    const user = users.find((u) => u.id === id);

    if (!user) {
      return null;
    }
    user.name = name;

    return user;
  },
};

module.exports = {
  usersService,
};
