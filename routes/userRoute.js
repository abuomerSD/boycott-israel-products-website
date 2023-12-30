const express = require('express');
const router = express.Router();
const { registerUser,getAllUsers } = require('../controllers/userController');

router.route('/').post(registerUser).get(getAllUsers);

module.exports = router;