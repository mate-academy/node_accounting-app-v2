let users = [];

module.exports = {
  getAll() {
    return users;
  },
  getById(id) {
    return users.find((user) => user.id === id);
  },
  create({ name }) {
    const id = (users[users.length - 1]?.id ?? 0) + 1;

    const newUser = {
      id,
      name,
    };

    users.push(newUser);

    return newUser;
  },
  update({ currentId, id, name }) {
    const targetUser = this.getById(currentId);

    Object.assign(targetUser, {
      id: id ?? targetUser.id,
      name: name ?? targetUser.name,
    });

    return targetUser;
  },
  remove(id) {
    users = users.filter((user) => user.id !== id);
  },
  removeAll() {
    users.length = 0;
  },
};
