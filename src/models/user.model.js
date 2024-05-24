const fs = require('fs');
const path = require('path');
const { User } = require('../helpers/newUser');

function getAllUsers() {
  const pathToDB = path.join(__dirname, '..', 'db', 'usersdb.json');

  const data = fs.readFileSync(pathToDB);

  return JSON.parse(data.toString());
}

async function createNewUser(name) {
  const newUser = new User(name);

  const { users } = await getAllUsers();

  users.push(newUser);

  const pathToDB = path.join(__dirname, '..', 'db', 'usersdb.json');

  fs.writeFileSync(pathToDB, JSON.stringify({ users }));

  return newUser;
}

async function getUserById(id) {
  const { users } = await getAllUsers();

  return users.find((user) => user.id === id);
}

async function deleteUser(id) {
  let { users } = await getAllUsers();

  const isUserExist = users.find((user) => user.id === id);

  if (!isUserExist) {
    return false;
  }

  users = users.filter((user) => user.id !== id);

  const pathToDB = path.join(__dirname, '..', 'db', 'usersdb.json');

  fs.writeFileSync(pathToDB, JSON.stringify({ users }));

  return true;
}

async function updateUser(id, data) {
  let { users } = await getAllUsers();
  let updatedUser;

  users = users.map((item) => {
    if (item.id === id) {
      const newUser = { ...item, ...data };

      updatedUser = newUser;

      return newUser;
    }

    return item;
  });

  const pathToDB = path.join(__dirname, '..', 'db', 'usersdb.json');

  fs.writeFileSync(pathToDB, JSON.stringify({ users }));

  return updatedUser;
}

module.exports = {
  getAllUsers,
  createNewUser,
  getUserById,
  deleteUser,
  updateUser,
};
