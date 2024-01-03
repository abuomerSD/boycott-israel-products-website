const express = require('express');
const router = express.Router();
const { registerUser,getAllUsers, login, updateUser, deleteUser } = require('../controllers/userController');
const { userAuth } = require('../middlewares/auth')

// router.post('/', userAuth, registerUser)
router.route('/').get(userAuth , getAllUsers).post(userAuth ,registerUser);
router.route('/login').post(login);
router.route('/:id').put(userAuth ,updateUser).delete( userAuth ,deleteUser);

module.exports = router;