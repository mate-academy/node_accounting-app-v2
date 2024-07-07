const mockUsers = require('../api/mockUser');

const userRepository = {
    create: (userData) => {
        const currentMockUsersLength = mockUsers.length;

        mockUsers.push(userData);

        return userData;
    },

    findAll: () => {
        const users = mockUsers;

        return users;
    },

    findByPk: (userId) => {
        const user = mockUsers.find(user => user.id === userId);

        return user;
    },

    findOne: (field, value) => {
        const user = mockUsers.find(user => user[field] === value);

        return user;
    },

    update: (userId, userData) => {
        const { name } = userData;

        const user = mockUsers.find(user => user.id === userId);

        user.name = name;

        return user;
    },

    destroy: (userId) => {
        const userIndex = mockUsers.findIndex(user => user.id === userId);

        const removedUser =  mockUsers.splice(userIndex, 1);

        return removedUser[0];
    }
}

module.exports = userRepository;