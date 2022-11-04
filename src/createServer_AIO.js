'use strict';
// *** NOTE: ***
// - In this file server doesnt split by components and modules
// |-- so you can see All In One(AIO) place:

function createServer() {
  const express = require('express');
  const fs = require('fs');
  const path = require('path');

  // Paths:
  const publicDirPath = path.join(__dirname, 'public');
  const usersDataBasePath = path.join(__dirname, 'data', 'users.json');
  const expensesDataBasePath = path.join(__dirname, 'data', 'expenses.json');
  // Port:
  const PORT = process.env.PORT || 5000;
  // App setup:
  const app = express();

  // Array for tests only; user.json file could store all the data permanently.
  let usersArr = [];
  let expensesArr = [];

  // Function to get the data from the array/json/db:
  const getUsersFromDB = () => {
    const data = fs.readFileSync(usersDataBasePath).toString();
    // TODO:
    // Return this from this func but NOT usersArr to use .json as DB.
    JSON.parse(data);
    // Not this:
    return usersArr;
  }

  // Function to write the data into the array/json/db:
  const writeUsersToDB = (newData) => {
    fs.writeFileSync(usersDataBasePath, JSON.stringify(newData, null, 2));
    // TODO:
    // Remove this line to use .json as DB.
    usersArr = newData;
  }

  // Function to get the data from the array/json/db:
  const getExpensesFromDB = () => {
    const data = fs.readFileSync(expensesDataBasePath).toString();
    // TODO:
    // Return this from this func but NOT expensesArr to use .json as DB.
    JSON.parse(data);
    return expensesArr;
  }

  // Function to write the data into the array/json/db:
  const writeExpensesToDB = (newData) => {
    fs.writeFileSync(expensesDataBasePath, JSON.stringify(newData, null, 2));
    // TODO:
    // Remove this line to use .json as DB.
    expensesArr = newData;
  }

  // Middleware:
  app.use(express.json());

  // ======= API Home page:
  app.get('/', (req, res) => {
    const indexHTMLPath = path.join(publicDirPath, 'index.html');

    res.end(fs.readFileSync(indexHTMLPath));
  })

  // ======= USERS API:
  // GET ALL:
  app.get('/users', (request, response) => {
    try {
      const jsonData = getUsersFromDB();

      response.statusCode = 200;
      response.json(jsonData);
    } catch (e) {
      response.sendStatus(500);
    }
  });

  // GET ONE:
  app.get('/users/:userID', (request, response) => {
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
  });

  // POST ONE:
  app.post('/users', (req, res) => {
    console.log('users POST')
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
  });

  // PATCH ONE:
  app.patch('/users/:userID', (req, res) => {
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
  });

  // DELETE ONE:
  app.delete('/users/:userID', (req, res) => {
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
  });

  // ======= EXPENSES API:
  // GET ALL:
  app.get('/expenses', (request, response) => {
    console.log('expenses GET ALL')
    try {
      const jsonData = getExpensesFromDB();
      const url = new URL(request.url, `${request.protocol}://${request.hostname}`)
      const params = {};
      let responseData = jsonData;

      console.log(params)
      url.searchParams.forEach((val, key) => params[key] = val);

      if (Object.keys(params).length === 0) {
        response.json(jsonData);

        return;
      }

      if (params.userId) {
        responseData = responseData.filter(item => item.userId === +params.userId);
      }

      if (params.category) {
        responseData = responseData.filter(item => item.category === params.category);
      }

      if (params.from && params.to) {
        console.log(params)

        responseData = responseData.filter(item => {
          const itemDate = new Date(item.spentAt);

          return itemDate >= new Date(params.from) && itemDate <= new Date(params.to);
        });
      }

      response.statusCode = 200;
      response.json(responseData);
    } catch (e) {
      response.sendStatus(500);
    }
  });

  // GET ONE:
  app.get('/expenses/:userID', (request, response) => {
    console.log('expenses GET ONE')
    const { userID } = request.params;

    try {
      const jsonData = getExpensesFromDB();
      const targetExpense = jsonData.find(item => item.id === +userID);

      if (!targetExpense) {
        response.sendStatus(404);

        return;
      }

      response.statusCode = 200;
      response.json(targetExpense);
    } catch (e) {
      response.sendStatus(500);
    }
  })

  // POST\Create ONE:
  app.post('/expenses', (req, res) => {
    console.log('expenses POST')
    try {
      const allUsers = getUsersFromDB();
      const jsonData = getExpensesFromDB();
      const newData = req.body;
      const currentUser = allUsers.find(user => user.id === newData.userId);


      if (!newData.title || !currentUser) {
        res.sendStatus(400);

        return;
      }
      console.log(currentUser, newData.title)

      newData.id = jsonData.length + 1;
      jsonData.push(newData);

      writeExpensesToDB(jsonData)

      res.statusCode = 201;
      res.json(newData);
    } catch (e) {
      res.sendStatus(500);
    }
  });

  // PATCH\Update ONE:
  app.patch('/expenses/:expenseId', (req, res) => {
    const { expenseId } = req.params;

    try {
      const jsonData = getExpensesFromDB();
      const currentExpenseIndex = jsonData.findIndex(item => item.id === +expenseId);
      const currentExpense = jsonData.find(item => item.id === +expenseId);
      const newData = req.body;

      if (!currentExpense || !newData.title) {
        res.sendStatus(404);

        return;
      }

      jsonData[currentExpenseIndex] = {...currentExpense ,...newData, id: +expenseId};

      writeExpensesToDB(jsonData)

      res.statusCode = 200;
      res.json(jsonData[currentExpenseIndex]);
    } catch (e) {
      res.sendStatus(500);
    }
  });

  // DELETE ONE:
  app.delete('/expenses/:expenseId', (req, res) => {
    const { expenseId } = req.params;

    try {
      const jsonData = getExpensesFromDB();

      if (!jsonData.find(item => item.id === +expenseId)) {
        res.sendStatus(404);

        return;
      }

      const newData = jsonData.filter(item => item.id !== +expenseId);

      writeExpensesToDB(newData)

      res.sendStatus(204);
    } catch (e) {
      res.sendStatus(500);
    }
  });

  // app.listen(PORT, () => {
  //   console.log('Server is running on port: ' + PORT);
  // });

  return app;
}

// Server init:
// createServer();

module.exports = {
  createServer,
};
