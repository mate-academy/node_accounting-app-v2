const { Router } = require('express');
const {
  getUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
} = require('../controllers/users.controller');
const router = Router();

module.exports = { router };

router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUserById);
router.patch('/:id', updateUserById);
router.delete('/:id', deleteUserById);
