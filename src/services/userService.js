const createUser = (users, userId, name) => {
  const newUser = {
    id: ++userId,
    name,
  };

  users.push(newUser);
  return newUser;
};

module.exports = {
  createUser,
};
