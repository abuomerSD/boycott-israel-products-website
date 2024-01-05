const express = require('express');
const router = express.Router();
const { registerUser,getAllUsers, login, updateUser, deleteUser } = require('../controllers/userController');
const { userAuth } = require('../middlewares/auth')

// router.post('/', userAuth, registerUser)
router.route('/').get(getAllUsers).post(registerUser);
router.route('/login').post(login);
router.route('/:id').put(updateUser).delete(deleteUser);

module.exports = router;