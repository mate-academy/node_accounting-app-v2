const mockUsers = require('../api/mockUsers');

const userRepository = {
  create: (userData) => {
    const newUser = {
      id: mockUsers.length + 1,
      ...userData,
    };

    mockUsers.push(newUser);

    return newUser;
  },

  findAll: () => {
    const users = mockUsers;

    return users;
  },

  findByPk: (userId) => {
    return mockUsers.find((user) => user.id === Number(userId));
  },

  findOne: (field, value) => {
    return mockUsers.find((user) => user[field] === value);
  },

  update: (userId, userData) => {
    const { name } = userData;

    const updatedUser = mockUsers.find((user) => user.id === Number(userId));

    updatedUser.name = name;

    return updatedUser;
  },

  destroy: (userId) => {
    const userIndex = mockUsers.findIndex((user) => user.id === Number(userId));

    return mockUsers.splice(userIndex, 1)[0];
  },

  resetUsers: () => {
    mockUsers.length = 0;
  },
};

module.exports = userRepository;
