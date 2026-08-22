'use strict';

function createUsersService() {
  const users = [];
  let lastId = 0;

  const getAll = () => users;

  const getById = (id) => users.find((user) => user.id === id);

  const create = (name) => {
    lastId += 1;

    const newUser = {
      id: lastId,
      name,
    };

    users.push(newUser);

    return newUser;
  };

  const update = (id, name) => {
    const user = getById(id);

    if (!user) {
      return null;
    }

    user.name = name;

    return user;
  };

  const remove = (id) => {
    const index = users.findIndex((user) => user.id === id);

    if (index === -1) {
      return null;
    }

    const [deletedUser] = users.splice(index, 1);

    return deletedUser;
  };

  return {
    getAll,
    getById,
    create,
    update,
    remove,
  };
}

module.exports = {
  createUsersService,
};
