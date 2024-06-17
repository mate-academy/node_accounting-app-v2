let users = [];

const getId = () => {
  return users.length ? Math.floor(Math.random() * 2137) : 1;
};

const getUsers = () => {
  return users;
};

const getUser = (id) => {
  return users.find((u) => u.id === id);
};

const deleteUser = (id) => {
  let exists = false;

  users = users.filter((u) => {
    if (u.id === id) {
      exists = true;

      return false;
    }

    return true;
  });

  return exists;
};

const addUser = ({ name }) => {
  if (typeof name !== 'string') {
    throw new Error('invalid name');
  }

  const user = {
    id: getId(),
    name,
  };

  users = [...users, user];

  return user;
};

const updateUser = (id, userInfo) => {
  if (typeof userInfo !== 'object' || userInfo === null) {
    throw new Error('invalid data');
  }

  const { name } = userInfo;

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
};

const deleteAllUsers = () => {
  users = [];
};

module.exports = {
  getUsers,
  getUser,
  deleteUser,
  addUser,
  updateUser,
  deleteAllUsers,
};
