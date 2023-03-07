'use strict';

const express = require('express');
const router = express.Router();
const controllers = require('./controllers');

router.use((req, res, next) => {
  req.headers.collection = req.baseUrl.slice(1);
  next();
});

router.get('/', controllers.getAll);
router.get('/:id', controllers.getById);
router.post('/', controllers.post);
router.delete('/:id', controllers.remove);
router.patch('/:id', controllers.patch);

module.exports = router;
