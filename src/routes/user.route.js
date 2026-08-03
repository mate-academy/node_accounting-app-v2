const expenss = require('express');
const userControler = require('./../controlers/user.controler');

const router = expenss.Router();

router.get('/', userControler.get);
router.get('/:id', userControler.getOne);
router.post('/', userControler.create);
router.delete('/:id', userControler.remove);
router.patch('/:id', userControler.update);

module.exports = { router };
