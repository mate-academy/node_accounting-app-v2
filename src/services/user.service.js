let users = [];
let nextUser = 1;

const resetUsers = () => {
  users = [];
};

const getAllUsers = () => {
  return users;
};

const getUserById = (id) => {
  return users.find((user) => user.id === id) || null;
};

const createUser = (name) => {
  const user = {
    id: nextUser++,
    name,
  };

  users.push(user);

  return user;
};

const updateUser = ({ id, name }) => {
  const user = getUserById(id);

  if (!user) {
    return {
      error: true,
      message: `User  with ID ${id} not found.`,
    };
  }

  Object.assign(user, { name });

  return user;
};

const removeUser = (id) => {
  users = users.filter((person) => person.id !== id);
};

module.exports = {
  resetUsers,
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  removeUser,
};
