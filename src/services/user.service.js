import { v4 as uuidv4 } from 'uuid';

let users = [];

export const getAllUsers = () => {
  return users;
};

export const getUsersById = (id) => {
  return users.find((item) => item.id === id) || null;
};

export const createUser = (name) => {
  const user = {
    name,
    id: uuidv4(),
  };

  users.push(user);

  return user;
};

export const uptadeUser = ({ id, name }) => {
  const user = getUsersById(id);

  Object.assign(user, { name });

  return user;
};

export const deleteUser = (id) => {
  users = users.filter((item) => item.id !== id);
};
