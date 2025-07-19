let users = [];

class UserService {
  resetData() {
    users = [];
  }

  getAllUsers() {
    return users;
  }

  createUser(userData) {
    const { name } = userData;

    if (!name) {
      throw new Error('Name is required');
    }

    const user = {
      id: Date.now(),
      name,
    };

    users.push(user);

    return user;
  }

  getUserById(id) {
    const user = users.find((u) => u.id === id);

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  updateUser(id, userData) {
    const { name } = userData;

    if (!name) {
      throw new Error('Name is required');
    }

    const user = users.find((u) => u.id === id);

    if (!user) {
      throw new Error('User not found');
    }

    user.name = name;

    return user;
  }

  deleteUser(id) {
    const userIndex = users.findIndex((u) => u.id === id);

    if (userIndex === -1) {
      throw new Error('User not found');
    }

    users.splice(userIndex, 1);

    return true;
  }
}

module.exports = new UserService();
