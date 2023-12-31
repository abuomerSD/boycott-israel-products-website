const express = require('express');
const router = express.Router();
const { registerUser,getAllUsers } = require('../controllers/userController');
const { userAuth } = require('../middlewares/auth')

// router.post('/', userAuth, registerUser)
router.route('/').get(getAllUsers).post(registerUser);

module.exports = router;