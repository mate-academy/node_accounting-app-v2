'use strict';

function userPoints(app, { users }) {
  let newUserID = 1;

  app.get('/', (req, res) => {
    res
      .status(200)
      .send(users.length === 0 ? [] : users);
  });

  app.get('/:userID', (req, res) => {
    const { userID } = req.params;
    const foundUser = users[userID];
    // const foundUser = users.find(user => user.id === +userID);

    if (!userID) {
      res
        .status(400)
        .send('userID is requered');

      return;
    }

    if (!foundUser) {
      res.sendStatus(404);
      res.send('User is not found');

      return;
    }

    res
      .status(200)
      .send(foundUser);
  });

  app.patch('/:userID', (req, res) => {
    const { userID } = req.params;
    const foundUser = users[userID];
    // const foundUser = users.find(user => user.id === +userID);

    if (!userID) {
      res
        .status(400)
        .send('userID is requered');

      return;
    }

    if (!foundUser) {
      res
        .status(404)
        .send('User is not found');

      return;
    }

    foundUser.name = req.body.name;

    res
      .status(200)
      .send(foundUser);
  });

  app.post('/', (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res
        .status(400)
        .send('Name is require');
    }

    const newUser = {
      id: newUserID++,
      name,
    };

    users[newUser.id] = newUser;
    // users.push(newUser);

    res
      .status(201)
      .send(newUser);
  });

  app.delete('/:userID', (req, res) => {
    const { userID } = req.params;
    const deleteUser = users[userID];
    // const deleteUser = users.find(user => user.id === +userID);

    if (!deleteUser) {
      res
        .status(404)
        .send('User is not found');

      return;
    }

    users.splice(userID, 1);
    // users.splice(users.indexOf(deleteUser), 1);

    res
      .status(204)
      .send(deleteUser);
  });
}
module.exports = { userPoints };
