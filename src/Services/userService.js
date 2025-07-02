let users = [];

const userService = {
  getAll() {
    return users;
  },

  getById(id) {
    return users.find((user) => user.id === Number(id));
  },

  create(name) {
    const nextId = users.length ? users[users.length - 1].id + 1 : 1;
    const user = {
      id: nextId,
      name: name,
    };

    users.push(user);

    return user;
  },

  update(id, name) {
    const user = this.getById(id);

    Object.assign(user, { name });

    return user;
  },

  delete(id) {
    users = users.filter((user) => user.id !== Number(id));
  },

  reset() {
    users = [];
  },
};

module.exports = userService;
