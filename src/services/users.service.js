function createUsersService() {
  const users = [];
  let count = 0;

  const getId = () => {
    return count++;
  };

  return {
    getAll() {
      return users;
    },

    create(name) {
      const user = { id: getId(), name };

      users.push(user);

      return user;
    },

    getById(id) {
      return users.find((user) => user.id === id);
    },

    deleteById(id) {
      const index = users.findIndex((item) => item.id === id);

      if (index === -1) {
        return;
      }

      const [user] = users.splice(index, 1);

      return user;
    },

    updateById({ id, name }) {
      const user = users.find((usr) => usr.id === id);

      if (!user) {
        return;
      }

      return Object.assign(user, { name });
    },
  };
}

module.exports = {
  createUsersService,
};
