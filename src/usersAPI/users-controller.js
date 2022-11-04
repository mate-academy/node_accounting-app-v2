'use strict';

// Imports:
const fs = require('fs');
const path = require('path');

// Path:
const usersDataBasePath = path.join(__dirname, '..', 'data', 'users.json');

// Array for tests only; user.json file could store all the data permanently.
let usersArr1 = [];

// Function to get the data from the array/json/db:
const getUsersFromDB = () => {
  const data = fs.readFileSync(usersDataBasePath).toString();
  // TODO:
  // Return this from this func but NOT usersArr to use .json as DB.
  return JSON.parse(data);
  // Not this:
   usersArr1;
}

// Function to write the data into the array/json/db:
const writeUsersToDB = (newData) => {
  fs.writeFileSync(usersDataBasePath, JSON.stringify(newData, null, 2));
  // TODO:
  // Remove this line to use .json as DB.
  usersArr1 = newData;
}
// Functions names below describes well what does it do :)
function getAllUsers(request, response) {
  try {
    const jsonData = getUsersFromDB();

    response.statusCode = 200;
    response.json(jsonData);
  } catch (e) {
    response.sendStatus(500);
  }
}

function getOneUsers(request, response) {
  const { userID } = request.params;

  try {
    const jsonData = getUsersFromDB();
    const targetUser = jsonData.find(item => item.id === +userID);

    if (!targetUser) {
      response.sendStatus(404);

      return;
    }

    response.statusCode = 200;
    response.json(targetUser);
  } catch (e) {
    response.sendStatus(500);
  }
}

function createOneUser(req, res) {
  try {
    const jsonData = getUsersFromDB();
    const newData = req.body;

    if (!newData.name) {
      res.sendStatus(400);

      return;
    }

    newData.id = jsonData.length + 1;
    jsonData.push(newData);

    writeUsersToDB(jsonData)

    res.statusCode = 201;
    res.json(newData);
  } catch (e) {
    res.sendStatus(500);
  }
}

function updateUser(req, res) {
  const { userID } = req.params;

  try {
    const jsonData = getUsersFromDB();
    const currentUserIndex = jsonData.findIndex(item => item.id === +userID);
    const currentUser = jsonData.find(item => item.id === +userID);
    const newName = req.body.name;

    if (!currentUser || !newName) {
      res.sendStatus(400);

      return null;
    }

    jsonData[currentUserIndex].name = newName;

    writeUsersToDB(jsonData)

    res.statusCode = 200;
    res.json(jsonData[currentUserIndex]);
  } catch (e) {
    res.sendStatus(500);
  }
}

function deleteUser(req, res) {
  const { userID } = req.params;

  try {
    const jsonData = getUsersFromDB();

    if (!jsonData.find(item => item.id === +userID)) {
      res.sendStatus(404);

      return null;
    }

    const newData = jsonData.filter(item => item.id !== +userID);

    writeUsersToDB(newData)

    res.sendStatus(204);
  } catch (e) {
    res.sendStatus(500);
  }
}

module.exports = {
  getAllUsers,
  getOneUsers,
  createOneUser,
  updateUser,
  deleteUser,
  getUsersFromDB,
}
