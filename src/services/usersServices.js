const uuidv4 = require('uuidv4'); 

let users = [];

export const getAllUsers = () => {
  return users;
};

export const getUserById = (userId) => {
  return users.find(person = person.id === userId) || null;
};

export const updateUser = (personId, name) => {
  const user = getUserById(personId);

  Object.assign(user, { name });

  return user;
}

export const addUser = (name) => {
  const newUser = {
    id: uuidv4(),
    name,
  }; 

  users.push(newUser);

  return newUser;
}

export const deleteUser = (id) => {
  users = users.filter(user => user.id !== id);
}