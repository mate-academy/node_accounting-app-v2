const port = process.env.PORT || 3000;

const HTTP_STATUS = {
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  ACCEPTED: 202,
};

module.exports = {
  port,
  HTTP_STATUS,
};
