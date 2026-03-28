function UserService(store) {
  function getAll() {
    return [...store.users];
  }

  function create({ name }) {
    const lastIndex = store.users.push({ name, id: store.nextUserId++ });

    return store.users[lastIndex - 1];
  }

  function remove(id) {
    const before = store.users.length;

    store.users = store.users.filter((u) => u.id !== id);

    return store.users.length < before;
  }

  function patch({ name }, id) {
    const user = getById(id);

    if (!user) {
      return null;
    }

    Object.assign(user, { name });

    return user;
  }

  function getById(id) {
    return store.users.find((u) => u.id === id);
  }

  return {
    getAll,
    create,
    remove,
    patch,
    getById,
  };
}

module.exports = { UserService };
