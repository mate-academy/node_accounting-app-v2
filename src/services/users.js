'use strict';

let users = [];

function getAllUsers() {
  return users;
}

function getUser(userId) {
  return users.find(user => user.id === Number(userId));
}

function createNewUser(name) {
  let newId = 0;

  if (users.length) {
    newId = [...users].sort(
      (userA, userB) => userB.id - userA.id
    )[0].id + 1;
  }

  const newUser = {
    id: newId,
    name,
  };

  users.push(newUser);

  return newUser;
}

function deleteUser(userId) {
  const filtredUsers = users.filter(user => user.id !== Number(userId));

  if (users.length !== filtredUsers.length) {
    users = filtredUsers;

    return true;
  }

  return false;
}

function updateUser(userId, name) {
  const findUser = users.find(user => user.id === Number(userId));

  if (findUser) {
    Object.assign(findUser, { name });

    return findUser;
  }

  return null;
}

module.exports.getAllUsers = getAllUsers;
module.exports.getUser = getUser;
module.exports.createNewUser = createNewUser;
module.exports.deleteUser = deleteUser;
module.exports.updateUser = updateUser;
