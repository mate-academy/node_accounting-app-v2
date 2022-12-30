'use strict';
const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const routerUsers = require('./usersAPI/users-router');
const routerExpenses = require('./expensesAPI/expenses-router');

function createServer() {
  // Paths:
  const publicDirPath = path.join(__dirname, 'public');
  // Port:
  // const PORT = process.env.PORT || 5000;
  // App setup:
  const app = express();

  // Middleware:
  app.use(express.json());
  app.use(cors());

  // ======= API Home page:
  app.get('/', (req, res) => {
    const indexHTMLPath = path.join(publicDirPath, 'index.html');

    res.end(fs.readFileSync(indexHTMLPath));
  });

  // ======= USERS API:
  app.use('/users', routerUsers)

  // ======= EXPENSES API:
  app.use('/expenses', routerExpenses)

  return app;
}

// Server init:
// createServer().listen(PORT);

module.exports = {
  createServer,
};
