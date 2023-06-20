'use strict';

function checkId(statusCode = 400) {
  return (req, res, next) => {
    if (isNaN(req.params.id)) {
      res.status(statusCode).send({ error: 'Bad request' });

      return;
    }

    next();
  };
}

module.exports = {
  checkId: checkId,
};
