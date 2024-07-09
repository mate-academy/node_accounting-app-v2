const users = require('../api/mockUsers');

const userRepository = {
  create: (userData) => {
    const id = users.size + 1;
    const newUser = {
      id,
      ...userData,
    };

    users.set(id, newUser);

    return newUser;
  },

  findAll: () => {
    return [...users.values()];
  },

  findByPk: (userId) => {
    return users.get(Number(userId));
  },

  findOne: (field, value) => {
    return [...users.values()].find((user) => user[field] === value);
  },

  update: (userId, userData) => {
    const updatedUser = users.get(Number(userId));

    if (userData.name) {
      updatedUser.name = userData.name;
    }

    users.set(Number(userId), updatedUser);

    return updatedUser;
  },

  destroy: (userId) => {
    const deletedUser = users.get(Number(userId));

    users.delete(Number(userId));

    return deletedUser;
  },

  resetUsers: () => {
    users.clear();
  },
};

module.exports = userRepository;
