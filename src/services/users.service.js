class UsersService {
  constructor() {
    this.users = [];
    this.errors = {};
  }
  getAll = () => this.users;
  resetAll = () => {
    this.users = [];
  };
  getById = (idToFind) => this.users.find(({ id }) => id === +idToFind);
  create = (name) => {
    const newUser = { id: this.users.length, name };

    this.users.push(newUser);

    return newUser;
  };
  udpate = (id, name) => {
    const user = this.getById(id);

    Object.assign(user, { name });

    return user;
  };
  delete = (idToDelete) => {
    this.users = this.users.filter(({ id }) => id !== +idToDelete);
  };
}

const usersService = new UsersService();

module.exports = { usersService };
