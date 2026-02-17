const createUserService = () => {
  const users = [];
  let idIndex = 1;

  const getAllUsers = () => [...users];

  const getUserById = (id) => users.find((u) => u.id === Number(id)) || null;

  const addUser = (name) => {
    const newUser = {
      id: idIndex++,
      name,
    };

    users.push(newUser);

    return newUser;
  };

  const updateUser = (id, name) => {
    const user = getUserById(Number(id));

    if (!user) {
      return null;
    }

    const changedUser = { ...user, name };

    Object.assign(user, changedUser);

    return changedUser;
  };

  const deleteUser = (id) => {
    const userIndex = users.findIndex((u) => u.id === Number(id));

    if (userIndex === -1) {
      return false;
    }

    users.splice(userIndex, 1);

    return true;
  };

  return {
    getAllUsers,
    getUserById,
    addUser,
    updateUser,
    deleteUser,
  };
};

module.exports = {
  createUserService,
};
