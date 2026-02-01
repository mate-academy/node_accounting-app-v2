class UserService {
  constructor() {
    this.users = [];
    this.nextId = 1;
  }

  getUserByID = (id) => {
    return this.users.find(({ id: userID }) => userID === id);
  };

  getAllUser = () => {
    return this.users;
  };

  createUser = (name) => {
    const newUser = { name, id: this.nextId++ };

    this.users.push(newUser);

    return newUser;
  };

  deleteUser = (id) => {
    const user = this.getUserByID(id);

    if (user) {
      const index = this.users.findIndex(({ id: userID }) => userID === id);

      this.users.splice(index, 1);
    }

    return user;
  };

  updateUser = (id, name) => {
    const user = this.getUserByID(id);

    if (user) {
      Object.assign(user, { name });
    }

    return user;
  };
}

module.exports = UserService;
