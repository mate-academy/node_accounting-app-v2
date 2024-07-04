let users = [];
let maxId = 0;

class User {
  static getUsers = () => {
    return users;
  };

  static addUser(name) {
    const newUser = { name, id: maxId++ };

    users.push(newUser);

    return newUser;
  }

  static getUser(id) {
    return users.find((user) => user.id.toString() === id.toString()) || null;
  }

  static deleteUser(id) {
    users = users.filter((user) => user.id.toString() !== id.toString());
  }

  static updateUser(id, { name }) {
    const userIndex = users.findIndex(
      (user) => user.id.toString() === id.toString(),
    );

    if (userIndex === -1) {
      return null;
    }
    users[userIndex] = { ...users[userIndex], name };

    return users[userIndex];
  }

  static reset() {
    users = [];
    maxId = 0;
  }
}

module.exports = User;
