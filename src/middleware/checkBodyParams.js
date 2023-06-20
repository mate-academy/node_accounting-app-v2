'use strict';

function checkBodyParams(paramsTitle, { statusCode = 400 }) {
  return (req, res, next) => {
    if (!req.body[paramsTitle]) {
      res.status(statusCode).send({ error: `${paramsTitle} is required` });

      return;
    }

    next();
  };
}

module.exports = {
  checkBodyParams,
};
