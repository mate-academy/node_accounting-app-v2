'use strict';

const {
  getALLAppUsers,
  postOneUser,
  patchOneUser,
  deleteOneUser,
  getOneUser,
} = require('./controllers/users');

function InitUserRoutes(app, { users }) {
  app.get('/', getALLAppUsers(users));

  app.get('/:id', getOneUser(users));

  app.delete('/:id', deleteOneUser(users));

  app.post('/', postOneUser(users));

  app.patch('/:id', patchOneUser(users));
}

module.exports = {
  InitUserRoutes,
};
