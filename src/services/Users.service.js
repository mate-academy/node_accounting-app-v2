function createUserService() {
  const users = [];

  return {
    getAllUsers: () => users.filter((user) => !!user),

    createUser: (name) => {
      const newUser = { id: users.length, name };

      users.push(newUser);

      return newUser;
    },

    getUserById: (id) => users[id],

    updateUserById: (id, name) => {
      if (!users[id]) {
        return null;
      }
      users[id].name = name;

      return users[id];
    },

    deleteUserById: (id) => {
      if (!users[id]) {
        return null;
      }
      users[id] = null;
    },
  };
}

module.exports = {
  createUserService,
};
