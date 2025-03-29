let users = [];

const getMaxId = () => {
  const ids = users.map((u) => u.id);

  return users.length === 0 ? 1 : Math.max(...ids) + 1;
};

const usersService = {
  async getAll() {
    return users;
  },

  async getUser(id) {
    try {
      const currentId = Number(id);

      const foundUser = users.find((user) => user.id === currentId);

      return foundUser;
    } catch (err) {
      throw new Error(`Catch error service: ${err.message}`);
    }
  },

  async addUser(name) {
    try {
      const newUser = { id: getMaxId(), name: name };

      users.push(newUser);

      return newUser;
    } catch (err) {
      throw new Error(err.message);
    }
  },

  async deleteUser(id) {
    try {
      const userToDelete = users.find((user) => user.id === id);

      if (!userToDelete) {
        return null;
      }

      users = users.filter((user) => user.id !== id);

      return 1;
    } catch (err) {
      throw new Error(`catch error delete user service: ${err.message}`);
    }
  },

  async updateUser(id, newName) {
    try {
      const userToUpdate = users.find((user) => user.id === Number(id));

      if (!userToUpdate) {
        return null;
      }

      userToUpdate.name = newName;

      return userToUpdate;
    } catch (err) {
      throw new Error(`catch error update user service: ${err.message}`);
    }
  },
};

module.exports = { usersService, users };
