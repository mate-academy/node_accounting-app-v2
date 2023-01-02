'use strict';

const express = require('express');
const cors = require('cors');
const userController = require('../controllers/userController');

const router = express.Router();

router.use(cors());

router.get('/', userController.getAll);

router.post('/', express.json(), userController.add);

router.get('/:userId', cors(), userController.getOne);

router.patch('/:userId', express.json(), userController.update);

router.delete('/:userId', userController.remove);

module.exports = {
  router,
};
