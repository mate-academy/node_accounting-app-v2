const createUsersService = (users) => {
  const findUsers = () => {
    return users;
  };

  const findUserById = (id) => {
    const user = users.find((userId) => userId.id === Number(id));

    return user;
  };

  const createUser = (newUser) => {
    const id = users.length + 1;
    const user = {
      id,
      ...newUser,
    };

    users.push(user);

    return user;
  };

  const patchUserById = (id, newData) => {
    const position = users.findIndex(
      (positionId) => positionId.id === Number(id),
    );

    if (position === -1) {
      return null;
    }

    const updatedUser = {
      ...users[position],
      ...newData,
    };

    users[position] = updatedUser;

    return updatedUser;
  };

  const deleteUserById = (id) => {
    const position = users.findIndex((userId) => userId.id === Number(id));

    if (position === -1) {
      return null;
    }

    const userDeleted = users.splice(position, 1);

    return userDeleted[0];
  };

  return {
    findUsers,
    findUserById,
    createUser,
    patchUserById,
    deleteUserById,
  };
};

module.exports = {
  createUsersService,
};
