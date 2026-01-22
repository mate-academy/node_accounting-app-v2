const ent = {
  usr: 'users',
  exp: 'expenses',
};

const mthds = {
  get: 'GET',
  post: 'POST',
  patch: 'PATCH',
  delete: 'DELETE',
};

const PORT = 3000;

const schemas = {
  user: {
    id: 0,
    name: 'name',
  },
};

module.exports = {
  ent,
  PORT,
  schemas,
  mthds,
};
