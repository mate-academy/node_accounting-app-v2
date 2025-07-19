const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'data', 'users.json');

function getAllUsers() {
  const data = fs.readFileSync(filePath, 'utf-8');

  return JSON.parse(data);
}

function getUser(userId) {
  const data = fs.readFileSync(filePath, 'utf-8');
  const users = JSON.parse(data);

  return users.find((user) => user.id === userId) || null;
}

function createUser(name) {
  const users = getAllUsers();
  const newId = users.length
    ? Math.max(...users.map((user) => user.id)) + 1
    : 1;

  const newUser = {
    id: newId,
    name,
  };

  users.push(newUser);

  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

  return newUser;
}

function removeUser(id) {
  const users = getAllUsers();
  const ids = users.map((user) => user.id);

  if (!ids.includes(id)) {
    return;
  }

  const removedUser = users.find((user) => user.id === id);
  const newUsers = users.filter((user) => user.id !== id);

  fs.writeFileSync(filePath, JSON.stringify(newUsers, null, 2));

  return removedUser;
}

function editUser(userId, newName) {
  const users = getAllUsers();
  const curUserIndex = users.findIndex((user) => user.id === userId);

  if (curUserIndex === -1) {
    return null;
  }

  const newUser = { id: userId, name: newName };
  const newUsers = [
    ...users.slice(0, curUserIndex),
    newUser,
    ...users.slice(curUserIndex + 1),
  ];

  fs.writeFileSync(filePath, JSON.stringify(newUsers, null, 2));

  return newUser;
}

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  removeUser,
  editUser,
};
