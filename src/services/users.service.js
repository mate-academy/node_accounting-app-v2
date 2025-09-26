function createUsersService() {
  let users = [];
  let nextUserId = 0;

  function getAll() {
    return users;
  }

  function getById(id) {
    return users.find((user) => user.id === +id) || null;
  }

  function create(name) {
    const user = {
      id: nextUserId,
      name,
    };

    users.push(user);

    nextUserId += 1;

    return user;
  }

  function update({ id, name }) {
    const user = getById(id);

    Object.assign(user, { id: +id, name });

    return user;
  }

  function remove(id) {
    const user = getById(id);

    if (!user) {
      return null;
    }

    users = users.filter((u) => u.id !== +id);

    return user;
  }

  return {
    getAll,
    getById,
    create,
    update,
    remove,
  };
}

module.exports = { createUsersService };
