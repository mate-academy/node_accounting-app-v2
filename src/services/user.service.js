let users = [];

function getNextId() {
  return users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1;
}

function getUsers() {
  return users;
}

function getUser(id) {
  return users.find((u) => u.id === id);
}

function deleteUser(id) {
  let exists = false;

  users = users.filter((u) => {
    if (u.id === id) {
      exists = true;

      return false;
    }

    return true;
  });

  return exists;
}

function createUser({ name }) {
  if (typeof name !== 'string') {
    throw new Error('invalid name');
  }

  const user = {
    id: getNextId(),
    name,
  };

  users = [...users, user];

  return user;
}

function updateUser(id, userData) {
  if (typeof userData !== 'object' || userData === null) {
    throw new Error('invalid data');
  }

  const { name } = userData;

  if (name && typeof name !== 'string') {
    throw new Error('invalid name');
  }

  let user;

  users = users.map((u) => {
    if (u.id === id) {
      const newUser = {
        ...u,
        name: name || u.name,
      };

      user = newUser;

      return newUser;
    }

    return u;
  });

  return user;
}

function clearUsers() {
  users = [];
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
  clearUsers,
};
