/*eslint-disable*/
"use strict";

const express = require("express");

const findMaxId = (data) => {
  if (data.length === 0) {
    return -1;
  }

  const ids = data.map((item) => item.id);

  return Math.max(...ids);
};

function createServer() {
  let users = [];
  let expences = [];

  const app = express();

  app.get("/users", (req, resp) => {
    resp.send(users);
  });

  app.post("/users", express.json(), (req, resp) => {
    const { name } = req.body;

    const newUser = {
      id: findMaxId(users) + 1,
      name,
    };

    if (!name) {
      resp.sendStatus(400);

      return;
    }

    users.push(newUser);

    resp.statusCode = 201;
    resp.send(newUser);
  });

  app.get("/users/:userId", (req, resp) => {
    const { userId } = req.params;

    const currentUser = users.find((user) => user.id === +userId);

    if (!currentUser) {
      resp.sendStatus(404);

      return;
    }

    resp.send(currentUser);
  });

  app.delete("/users/:userId", (req, resp) => {
    const { userId } = req.params;
    const filteredUsers = users.filter((user) => user.id !== +userId);

    const findUser = users.find((user) => user.id === +userId);

    if (users.length === filteredUsers.length || !findUser) {
      resp.sendStatus(404);

      return;
    }

    users = filteredUsers;
    resp.sendStatus(204);
  });

  app.patch("/users/:userId", express.json(), (req, resp) => {
    const { userId } = req.params;
    const data = req.body;

    const currentUser = users.find((user) => user.id === +userId);

    if (!currentUser) {
      resp.sendStatus(404);

      return;
    }

    Object.assign(currentUser, data);

    resp.send(currentUser);
  });

  app.get("/expenses", (req, resp) => {
    const { userId, categories, from, to } = req.query;

    console.log(req.query);

    let newExpenses = [...expences];

    if (userId) {
      newExpenses = expences.filter((item) => item.userId === +userId);
    }

    if (categories) {
      newExpenses = expences.filter((item) => item.category === categories);
    }

    if (from) {
      const dateObject = new Date(from).getTime();

      newExpenses = newExpenses.filter((item) => {
        const dateNow = new Date(item.spentAt).getTime();

        return dateNow >= dateObject;
      });
    }

    if (to) {
      const dateObject = new Date(to).getTime();

      newExpenses = newExpenses.filter((item) => {
        const dateNow = new Date(item.spentAt).getTime();

        return dateNow <= dateObject;
      });
    }

    resp.send(newExpenses);
  });

  app.post("/expenses", express.json(), (req, resp) => {
    const { userId, title } = req.body;

    const isUserExist = users.find((user) => user.id === userId);

    const isError = !isUserExist || !title;

    if (isError) {
      resp.sendStatus(400);

      return;
    }

    const newExpenses = {
      id: findMaxId(expences) + 1,
      userId,
      title,
      ...req.body,
    };

    expences.push(newExpenses);

    resp.statusCode = 201;
    resp.send(newExpenses);
  });

  app.get("/expenses/:id", (req, resp) => {
    const { id } = req.params;

    const currentExpense = expences.find((item) => item.id === +id);

    if (!currentExpense) {
      resp.sendStatus(404);

      return;
    }

    resp.send(currentExpense);
  });

  app.delete("/expenses/:id", (req, resp) => {
    const { id } = req.params;

    const currentExpense = expences.find((item) => item.id === +id);

    if (!currentExpense) {
      resp.sendStatus(404);

      return;
    }

    expences = expences.filter((item) => item.id !== +id);

    resp.sendStatus(204);
  });

  app.patch("/expenses/:id", express.json(), (req, resp) => {
    const { id } = req.params;
    const data = req.body;

    const currentExpense = expences.find((item) => item.id === +id);

    if (!currentExpense) {
      resp.sendStatus(404);

      return;
    }

    for (const key in data) {
      if (key === "id") {
        resp.sendStatus(400);

        return;
      }

      currentExpense[key] = data[key];
    }

    resp.send(currentExpense);
  });

  return app;
}

module.exports = {
  createServer,
};
