let users = [];
let userId = 1;

class UserService {
  resetData = () => {
    users = [];
    userId = 1;
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

  update(id, updateObj) {
    const user = this.getById(id);

    if ('name' in updateObj) {
      user.name = updateObj.name;
    }

    return user;
  }

  delete = (id) => {
    users = users.filter((item) => item.id !== id);
  };
}

module.exports = new UserService();
