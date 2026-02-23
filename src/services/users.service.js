'use strict';

function createUsersService() {
  const users = [];
  let lastID = 0;

  function getAll() {
    return users;
  }

  function getById(id) {
    return users.find((user) => user.id === id);
  }

  function create(name) {
    lastID++;

    const user = { id: lastID, name };

    users.push(user);

    return user;
  }

  function deleteById(id) {
    const index = users.findIndex((u) => u.id === id);

    if (index === -1) {
      return;
    }

    const [user] = users.splice(index, 1);

    return user;
  }

  function update({ id, name }) {
    const user = users.find((u) => u.id === id);

    if (!user) {
      return;
    }

    return Object.assign(user, { name });
  }

  return {
    getAll,
    getById,
    create,
    deleteById,
    update,
  };
}

module.exports = {
  createUsersService,
};
