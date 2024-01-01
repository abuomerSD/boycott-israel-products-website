const express = require('express');
const router = express.Router();
const { registerUser,getAllUsers, login } = require('../controllers/userController');
const { userAuth } = require('../middlewares/auth')

// router.post('/', userAuth, registerUser)
router.route('/').get(userAuth , getAllUsers).post(userAuth ,registerUser);
router.post('/login', login);

module.exports = router;