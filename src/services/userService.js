let users = [];
let userId = 1;

class UserService {
  resetData = () => {
    users = [];
  };

  getAll = () => {
    return users;
  };

  getById = (id) => {
    return users.find((user) => user.id === id) || null;
  };

  create = (name) => {
    const newUser = {
      id: userId++,
      name,
    };

    users.push(newUser);

    return newUser;
  };

  update(id, { name }) {
    const user = this.getById(id);

    if (name) {
      user.name = name;
    }

    return user;
  }

  delete = (id) => {
    users = users.filter((item) => item.id !== id);
  };
}

module.exports = new UserService();
