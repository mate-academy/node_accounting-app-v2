const express = require('express');
const {
  get,
  getOne,
  add,
  change,
  remove,
} = require('../controllers/expensesControllers');

export const usersRouter = express.Router();

router.get('/', cors(), get);

router.get('/:id', getOne);

router.post('/', add);

router.put('/:id', change);

router.delete('/:id', remove);

module.exports = {
  router,
};
