/* eslint-disable no-console */
'use strict';

const express = require('express');
const { generateId } = require('./generateId');

function getAllUsers(app) {
  app.get('/users', express.json(), (req, res) => {
    res.send(app.users);
  });
}

function getUserById(app) {
  app.get('/users/:userId', (req, res) => {
    const { userId } = req.params;
    const foundUser = app.getUser(userId);

    if (!foundUser) {
      res.status(404).send('User does not exist');

      return;
    }

    res.send(foundUser);
  });
}

function createNewUser(app) {
  app.post('/users', express.json(), (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.status(400).send('Incorrect user name');

      return;
    }

    const newUser = {
      id: generateId(app.users),
      name,
    };

    app.users.push(newUser);

    res.status(201).send(newUser);
  });
}

function removeUser(app) {
  app.delete('/users/:userId', (req, res) => {
    const { userId } = req.params;
    const existUser = app.users.some(user => user.id === +userId);
    const filteredUsers = app.users.filter(user => user.id !== +userId);

    if (!existUser) {
      res.status(404).send('User does not exist');

      return;
    }

    app.users = filteredUsers;

    res.status(204).send(filteredUsers);
  });
}

function updateUser(app) {
  app.patch('/users/:userId', express.json(), (req, res) => {
    const { userId } = req.params;
    const foundUser = app.users.find(user => user.id === +userId);

    if (!foundUser) {
      res.status(404).send('User is not found');

      return;
    }

    console.log(req.body);

    const { name } = req.body;

    if (!name) {
      res.status(400).send('No user with this name');
    }

    if (typeof name !== 'string') {
      res.status(422).send('Incorrect name type');

      return;
    }

    Object.assign(foundUser, {
      name,
    });

    res.status(200).send(foundUser);
  });
}

module.exports = {
  getAllUsers, getUserById, createNewUser, removeUser, updateUser,
};
