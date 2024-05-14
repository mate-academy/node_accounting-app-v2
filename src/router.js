const express = require('express');
const router = express.Router();

const app = express();

app.use('/', router);

module.expert = {
  router,
};
