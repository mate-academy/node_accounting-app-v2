let users = [];

module.exports = {
  getAll: () => {
    return users;
  },

  getById: (id) => {
    const user = users.find((u) => u.id === +id);

    return user || null;
  },

  create: (name) => {
    const maxId = users.reduce((max, user) => Math.max(max, user.id), 0);
    const newId = maxId + 1;

    const newUser = {
      id: newId,
      name,
    };

    users.push(newUser);

    return newUser;
  },

  edit: function (id, name) {
    const user = this.getById(id);

    if (!user) {
      throw new Error();
    }

    Object.assign(user, { name });

    return user;
  },

  remove: (id) => {
    const newUsers = [...users].filter((u) => u.id !== +id);

    if (newUsers.length === users.length) {
      throw new Error();
    }

    users = newUsers;
  },

  reset: () => {
    users = [];
  },
};
