const mockUsers = new Map();

const getAll = () => {
  return [...mockUsers.values()];
};

const getUserById = (id) => {
  return mockUsers.get(Number(id));
};

const createUser = (name) => {
  const id = Math.max(...mockUsers.keys(), 0) + 1;
  const newUser = { id, name };

  mockUsers.set(id, newUser);

  return newUser;
};

const deleteUserById = (id) => {
  const deletedUser = mockUsers.get(id);

  mockUsers.delete(id);

  return deletedUser;
};

const updateUserById = ({
  id,
  name,
  spentAt,
  title,
  amount,
  category,
  note,
}) => {
  if (!mockUsers.has(id)) {
    return null;
  }

  const tempUser = mockUsers.get(Number(id));

  const newUser = {
    ...tempUser,
    name,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  mockUsers.set(Number(id), newUser);

  return newUser;
};

const resetMockUsers = () => {
  mockUsers.clear();
};

module.exports = {
  getAll,
  getUserById,
  createUser,
  deleteUserById,
  updateUserById,
  resetMockUsers,
};
