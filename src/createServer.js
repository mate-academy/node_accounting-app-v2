'use strict';

const express = require('express');
const app = express();

function createServer() {
  // Use express to create a server
  // Add a routes to the server
  // Return the server (express app)
  app.get('/users', (req, res) => {
  });

  app.post('/users', (req, res) => {
  });

  app.get('/users/:id', (req, res) => {
  });

  app.delete('/users/:id', (req, res) => {
  });

  app.patch('/users:id', (req, res) => {
  });

  app.get('/expenses', (req, res) => {
  });

  app.post('/expenses', (req, res) => {
  });

  app.get('/expenses/:id', (req, res) => {
  });

  app.delete('/expenses/:id', (req, res) => {
  });

  app.patch('/expenses:id', (req, res) => {
  });
}

module.exports = {
  createServer,
};
